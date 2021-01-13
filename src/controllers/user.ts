/* eslint-disable no-extra-parens */
import admin from 'firebase-admin'
import httpErrors from 'http-errors'
import { CustomNodeJSGlobal } from '../custom'
import { List } from './list'
import { DtoList, DtoUser } from '../dto-interfaces'
import { IList, IUser } from '../interfaces'
import { errorHandling, CFU, EFU, EMFA, MFU } from './utils'
import {
  deliverPassword,
  generatePassword,
  notifyProcuratorRegistered,
  notifyProcuratorWithoutMail,
  PATA
} from '../utils'

declare const global: CustomNodeJSGlobal
const KEY_PASSWORD = process.env.KEY_PASSWORD as string
class User {
  private _args: DtoUser | DtoUser[]
  private _usersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: DtoUser | DtoUser[]) {
    this._args = args
    this._usersRef = global.firestoreDB.collection('users')
  }

  public process (
    type : string,
    list?: DtoList
  ): Promise<IUser> | Promise<string> | undefined {
    switch (type) {
      case 'committee':
        return this._setCommitteeMembers()
      case 'enroll':
        return this._enroll(list as DtoList)
      case 'notify':
        return this._notify()
      case 'verify':
        return this._verify()
      default:
        return undefined
    }
  }

  private async _setCommitteeMembers (): Promise<string> {
    const posibleMembers = this._args as DtoUser[]
    const fullData: IUser[] = []

    try {
      // Verify if there aren't committee members
      const currentCommitteeMembers = await this._usersRef
        .where('committeeMember', '==', true)
        .get()

      if (currentCommitteeMembers.docs.length > 0)
        throw new httpErrors.Conflict(EMFA.committeeAlreadyRegistered)

      for (let i = 0; i < posibleMembers.length; i++) {
        this._args = posibleMembers[i]
        // eslint-disable-next-line no-await-in-loop
        const data = await this._getUserData('UNICode')
        const condition = data.condition === 'teacher' ? 'docente': 'estudiante'

        if (data.postulating)
          throw new httpErrors.Conflict(`El ${condition} identificado con el código: ${data.UNICode} está postulando.`)

        if (data.registered)
          throw new httpErrors.Conflict(`El ${condition} identificado con el código: ${data.UNICode} es personero.`)

        fullData.push(data)
      }

      const numberOfTeachers = fullData.reduce((result, { condition }) => {
        return condition === 'teacher' ? ++result : result
      }, 0)

      const numberOfStudents = fullData.reduce((result, { condition }) => {
        return condition === 'student' ? ++result : result
      }, 0)

      if (numberOfTeachers !== 6)
        throw new httpErrors.BadRequest(EMFA.missingTeachers)
      if (numberOfStudents !== 3)
        throw new httpErrors.BadRequest(EMFA.missingStudents)

      for (let i = 0; i < fullData.length; i++)
        // eslint-disable-next-line no-await-in-loop
        await this._usersRef
          .doc(fullData[i].id as string)
          .update({
            committeeMember: true
          })

      return 'The committee members were successfully registered'

    } catch (error) {
      return errorHandling(error, EMFA.generic)
    }
  }

  private async _enroll (list: DtoList): Promise<IUser> {
    const document = (this._args as DtoUser)?.documentType === '0'
      ? 'documentNumber'
      : 'UNICode'

    try {
      const listData = await new List(list).getListData()

      if (listData.closed) throw new httpErrors.Conflict(EFU.errorEnrolling5)

      const ownerData = await this._getUserData(undefined, list.owner)

      // Validating if the procurator is registered
      if (!ownerData.registered)
        throw new httpErrors.Forbidden(EFU.errorEnrolling9)

      // Validating if the user that is going to be enrolled is the owner
      if (document === 'UNICode' && ownerData.UNICode === (this._args as DtoUser).documentNumber)
        throw new httpErrors.Conflict(EFU.errorEnrolling7)
      if (document === 'documentNumber' && ownerData.documentNumber === (this._args as DtoUser).documentNumber)
        throw new httpErrors.Conflict(EFU.errorEnrolling7)

      // Validating if the procurator is the owner of the list
      if (listData.owner !== list.owner)
        throw new httpErrors.Forbidden(EFU.errorEnrolling6)

      let userData = await this._getUserData(document)

      const isATeacherList = listData.type === PATA.d ||
        listData.type === PATA.fc ||
        listData.type === PATA.r ||
        listData.type === PATA.ua

      if (userData.condition === 'teacher')
        if (isATeacherList)
          await this._validateAndEnroll(
            userData,
            new List(list),
            ownerData,
            listData
          )
        else
          throw new httpErrors.BadRequest(`${CFU.indefiniteArticle}${CFU.teacher}${EFU.errorEnrolling4}${CFU.student}s.`)
      else
        if (isATeacherList)
          throw new httpErrors.BadRequest(`${CFU.indefiniteArticle}${CFU.student}${EFU.errorEnrolling4}${CFU.teacher}s.`)
        else
          await this._validateAndEnroll(
            userData,
            new List(list),
            ownerData,
            listData
          )

      userData = await this._getUserData(document)

      return userData
    } catch (error) {
      return errorHandling(
        error,
        (this._args as DtoUser)?.condition === 'teacher'
          ? `${EFU.errorEnrolling}${CFU.pTeacher}`
          : `${EFU.errorEnrolling}${CFU.pStudent}`
      )
    }
  }

  private async _notify (): Promise<string> {
    let hasEmail = false

    try {
      const newPassword = generatePassword(KEY_PASSWORD)
      const user = await this._getUserData()

      // Verify if the user is already registered
      if (user.registered)
        throw new httpErrors.Conflict(EFU.errorNotifying2)

      // Verify if the user has email
      if ('mail' in user && user.mail !== '') {
        hasEmail = true
        await deliverPassword(user.mail as string, newPassword.password)
      } else if ('optionalMail' in user && user.optionalMail !== '')
        await deliverPassword(user.optionalMail as string, newPassword.password)
      else {
        await notifyProcuratorWithoutMail(user)
        throw new httpErrors.Conflict(EFU.userHasNotMail)
      }

      // Updating that the user is registered
      await this._usersRef
        .doc(user.id as string)
        .update({
          gender    : (this._args as DtoUser)?.gender,
          registered: true
        })

      // Registering the user into Firebase Authentication
      await admin.auth().createUser({
        email   : hasEmail ? user.mail: user.optionalMail,
        password: newPassword.password,
        uid     : user.id as string
      })

      await notifyProcuratorRegistered({
        ...user,
        gender: (this._args as DtoUser).gender
      } as IUser)

      return MFU.updateAndNotifySuccess
    } catch (error) {
      return errorHandling(error, EFU.errorNotifying)
    }
  }

  private async _verify (): Promise<IUser> {
    const document = (this._args as DtoUser)?.documentType === '0'
      ? 'documentNumber'
      : 'UNICode'
    let user: IUser

    try {
      user = await this._getUserData(document)

      return {
        condition     : user.condition,
        faculty       : user.faculty,
        gender        : user.gender || null,
        id            : user.id,
        lastName      : user.lastName,
        mail          : user.mail || user.optionalMail || '',
        names         : user.names,
        registered    : !user.registered ? false : user.registered,
        secondLastName: user.secondLastName
      } as IUser
    } catch (error) {
      return errorHandling(error, EFU.errorVerifyingUser)
    }
  }

  private async _validateAndEnroll (
    userData: IUser,
    list    : List,
    owner   : IUser,
    listData: IList
  ): Promise<void> {
    if ('postulating' in userData && userData.postulating)
      throw userData.condition === 'teacher'
        ? new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling1}`)
        : new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling1}`)

    if ('registered' in userData && userData.registered)
      throw userData.condition === 'teacher'
        ? new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling2}`)
        : new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling2}`)

    if ('committeeMember' in userData && userData.committeeMember)
      throw userData.condition === 'teacher'
        ? new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling3}`)
        : new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling3}`)

    if (
      listData.type === PATA.d ||
      listData.type === PATA.fc ||
      listData.type === PATA.tof
    )
      if (owner.faculty !== userData.faculty)
        throw new httpErrors.BadRequest(EFU.errorEnrolling8)

    await this._usersRef
      .doc(userData.id as string)
      .update({ postulating: true })

    await list.enroll(userData)
  }

  private async _getUserData (
    document?: string,
    id?      : string
  ): Promise<IUser> {
    let user:
      | FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
      | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>

    if (document) {
      user = await this._usersRef
        .where(document as string, '==', (this._args as DtoUser)?.documentNumber as string)
        .get()

      if (user.docs.length === 0)
        throw new httpErrors.NotFound(EFU.userNotFound)

      return user.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        } as IUser
      })[0]
    }

    if (id)
      user = await this._usersRef.doc(id as string).get()
    else
      user = await this._usersRef
        .doc((this._args as DtoUser)?.id as string)
        .get()

    if (!user.data())
      throw new httpErrors.NotFound(EFU.userNotFound)

    return {
      ...user.data(),
      id: (this._args as DtoUser).id as string
    } as IUser
  }
}

export { User }
