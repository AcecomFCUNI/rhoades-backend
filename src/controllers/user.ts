/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from 'firebase-admin'
import httpErrors from 'http-errors'
import { CustomNodeJSGlobal } from '../custom/index'
import { List } from './list'
import { DtoList, DtoUser } from '../dto-interfaces/index'
import { IUser } from '../interfaces/index'
import { CFU, EFU, MFU } from './utils/index'
import {
  deliverPassword,
  MFME,
  generatePassword,
  notifyProcuratorRegistered,
  PATA
} from '../utils/index'

declare const global: CustomNodeJSGlobal
const KEY_PASSWORD = process.env.KEY_PASSWORD as string
class User {
  private _args: DtoUser
  private _usersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: DtoUser) {
    this._args = args
    this._usersRef = global.firestoreDB.collection('users')
  }

  public process (
    type : string,
    list?: DtoList
  ): Promise<IUser> | Promise<string> | undefined {
    switch (type) {
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

  private async _enroll (list: DtoList): Promise<IUser> {
    const document = this._args?.documentType === '0' ? 'documentNumber' : 'UNICode'

    try {
      let userData = await this._getUserData(document)
      const listData = await new List(list).getListData()

      const isATeacherList = listData.type === PATA.d ||
        listData.type === PATA.fc ||
        listData.type === PATA.r ||
        listData.type === PATA. ua ||
        listData.type === PATA.uc

      if (userData.condition === 'teacher')
        if (isATeacherList)
          await this._validateAndEnroll(userData, new List(list))
        else
          throw new httpErrors.BadRequest(`${CFU.indefiniteArticle}${CFU.teacher}${EFU.errorEnrolling4}${CFU.student}s.`)
      else
        if (isATeacherList)
          throw new httpErrors.BadRequest(`${CFU.indefiniteArticle}${CFU.student}${EFU.errorEnrolling4}${CFU.teacher}s.`)
        else
          await this._validateAndEnroll(userData, new List(list))

      userData = await this._getUserData(document)

      return userData
    } catch (error) {
      console.error(error)

      if (
        error.message === EFU.teacherNotFound ||
        error.message === EFU.studentNotFound ||
        error.message === `${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling1}` ||
        error.message === `${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling1}` ||
        error.message === `${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling2}` ||
        error.message === `${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling2}` ||
        error.message === `${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling3}` ||
        error.message === `${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling3}` ||
        error.message === `${CFU.indefiniteArticle}${CFU.teacher}${EFU.errorEnrolling4}${CFU.student}s.` ||
        error.message === `${CFU.indefiniteArticle}${CFU.student}${EFU.errorEnrolling4}${CFU.teacher}s.`
      )
        throw error

      throw this._args?.condition === 'teacher'
        ? new httpErrors.InternalServerError(`${EFU.errorEnrolling}${CFU.pTeacher}`)
        : new httpErrors.InternalServerError(`${EFU.errorEnrolling}${CFU.pStudent}`)
    }
  }

  private async _notify (): Promise<string> {
    let hasEmail = false

    try {
      const newPassword = generatePassword(KEY_PASSWORD)
      const user = await this._getUserData()

      // Verify if the user has email
      if ('mail' in user && user.mail !== '') {
        hasEmail = true
        await deliverPassword(user.mail as string, newPassword.password)
      } else if ('optionalMail' in user && user.optionalMail !== '')
        await deliverPassword(user.optionalMail as string, newPassword.password)
      else
        throw new httpErrors.Conflict(EFU.userHasNotMail)

      // Updating that the user is registered
      await this._usersRef
        .doc(user.id as string)
        .update({
          gender    : this._args?.gender,
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
        gender: this._args.gender
      } as IUser)

      return MFU.updateAndNotifySuccess
    } catch (error) {
      console.log(error)

      if (
        error.message === MFME.generic ||
        error.message === EFU.userHasNotMail ||
        error.message === EFU.userNotFound
      )
        throw error

      throw new httpErrors.InternalServerError(EFU.errorNotifying)
    }
  }

  private async _verify (): Promise<IUser> {
    const document = this._args?.documentType === '0' ? 'documentNumber' : 'UNICode'
    let user: IUser

    try {
      user = await this._getUserData(document)

      return {
        id            : user.id,
        lastName      : user.lastName,
        mail          : user.mail || user.optionalMail || '',
        names         : user.names,
        registered    : !user.registered ? false : user.registered,
        secondLastName: user.secondLastName
      } as IUser
    } catch (error) {
      console.error(error)

      if (error.message === EFU.userNotFound)
        throw error

      throw new httpErrors.InternalServerError(EFU.errorVerifyingUser)
    }
  }

  private async _validateAndEnroll (userData: IUser, list: List) {
    if ('postulating' in userData || userData.postulating)
      throw userData.condition === 'teacher'
        ? new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling1}`)
        : new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling1}`)

    if ('registered' in userData || userData.registered)
      throw userData.condition === 'teacher'
        ? new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling2}`)
        : new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling2}`)

    if ('committeeMember' in userData || userData.committeeMember)
      throw userData.condition === 'teacher'
        ? new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.teacher}${EFU.errorEnrolling3}`)
        : new httpErrors.Conflict(`${CFU.definiteArticle}${CFU.student}${EFU.errorEnrolling3}`)

    await this._usersRef
      .doc(userData.id as string)
      .update({ postulating: true })

    await list.enroll(userData)
  }

  private async _getUserData (document?: string): Promise<IUser> {
    let user:
      | FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
      | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>

    if (document) {
      user = await this._usersRef
        .where(document as string, '==', this._args?.documentNumber as string)
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

    user = await this._usersRef.doc(this._args?.id as string).get()

    if (!user.data())
      throw new httpErrors.NotFound(EFU.userNotFound)

    return {
      ...user.data(),
      id: this._args.id as string
    } as IUser
  }
}

export { User }
