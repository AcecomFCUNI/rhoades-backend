/* eslint-disable no-extra-parens */
import firestore from '@google-cloud/firestore'
import httpErrors from 'http-errors'
import { CustomNodeJSGlobal } from '../custom/index'
import { DtoList } from '../dto-interfaces/index'
import { CFU, EFL, MFL } from './utils/index'
import { PATA, notifyFinishRegistrationList } from '../utils/index'
import { IList, IUser } from '../interfaces/index'

declare const global: CustomNodeJSGlobal

class List {
  private _args: DtoList
  private _listRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >
  private _userRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: DtoList) {
    this._args = args
    this._listRef = global.firestoreDB.collection('lists')
    this._userRef = global.firestoreDB.collection('users')
  }

  public process (
    type: string
  ):
    | Promise<string>
    | Promise<IList>
    | Promise<Record<string, unknown>>
    | undefined {
    switch (type) {
      case 'createList':
        return this._createList()
      case 'finishRegistration':
        return this._finishRegistration()
      case 'getListsOfUser':
        return this._getListsOfUser()
      default:
        return undefined
    }
  }

  private async _createList (): Promise<IList> {
    let list: firestore.DocumentReference<firestore.DocumentData>
    try {
      const owner = await this._getDetailUserData(this._args.owner as string)

      if (!owner) throw new httpErrors.NotFound(EFL.missingOwner)

      const ownerData = {
        ...owner,
        id: this._args.owner
      } as IUser

      if (!ownerData.registered)
        throw new httpErrors.Unauthorized(EFL.unauthorizedRegistration)

      const numberOfList = await this._getNumberOfList()

      if (numberOfList >= 2) throw new httpErrors.Conflict(EFL.limitList)

      switch (this._args.type) {
        case PATA.d:
        case PATA.fc:
        case PATA.tof:
          list = await this._listRef.add({
            applicants: [],
            closed    : false,
            faculty   : this._args.faculty,
            owner     : this._args.owner,
            type      : this._args.type
          })
          break
        default:
          list = await this._listRef.add({
            applicants: [],
            closed    : false,
            owner     : this._args.owner,
            type      : this._args.type
          })
      }

      const dataList = {
        ...(await list.get()).data(),
        id: list.id
      } as IList

      return dataList
    } catch (error) {
      console.error(error)

      switch (error.message) {
        case EFL.missingOwner:
        case EFL.unauthorizedRegistration:
        case EFL.limitList:
          throw error
        default:
          throw new httpErrors.InternalServerError(EFL.errorCreating)
      }
    }
  }

  private async _finishRegistration (): Promise<string> {
    try {
      const list = await this.getListData()

      if (list.closed)
        throw new httpErrors.Conflict(EFL.alreadyFinished)

      if (list.owner !== this._args.owner)
        throw new httpErrors.Forbidden(EFL.unauthorizedFinish)

      const owner = await this._getDetailUserData(this._args.owner as string)

      if (!owner)
        throw new httpErrors.NotFound(EFL.missingOwner)

      const ownerData = {
        ...owner,
        id: this._args.owner
      } as IUser

      await this._listRef.doc(this._args.id as string).update({
        closed: true
      })

      notifyFinishRegistrationList(list, ownerData)

      return MFL.finishRegistration
    } catch (error) {
      console.log(error)

      if (error.message.includes('No document to update'))
        throw new httpErrors.NotFound(EFL.missingList)

      switch (error.message) {
        case EFL.alreadyFinished:
        case EFL.missingList:
        case EFL.missingOwner:
        case EFL.unauthorizedFinish:
          throw error
        default:
        throw new httpErrors.InternalServerError(EFL.errorFinishingRegistration)
      }
    }
  }

  private async _getListsOfUser (): Promise<Record<string, unknown>> {
    try {
      const lists = await this._listRef
        .where('owner', '==', this._args.owner as string)
        .get()

      if (lists.docs.length === 0) return {}

      const listsData = lists.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        } as IList
      })

      const teacherLists = listsData.filter(list => {
        if (
          list.type === PATA.d ||
          list.type === PATA.fc ||
          list.type === PATA.r ||
          list.type === PATA.ua
        )
          return list

        return undefined
      })

      if (teacherLists.length > 0)
        teacherLists[0].applicants = await this._getDetailUsersData(
          teacherLists[0]
        )

      const studentLists = listsData.filter(list => {
        if (
          list.type === PATA.tof ||
          list.type === PATA.uta ||
          list.type === PATA.utc
        )
          return list

        return undefined
      })

      if (studentLists.length > 0)
        studentLists[0].applicants = await this._getDetailUsersData(
          studentLists[0]
        )

      const finalResult = {
        students: studentLists[0],
        teachers: teacherLists[0]
      }

      return finalResult
    } catch (error) {
      console.error(error)

      throw error
    }
  }

  private async _getDetailUserData (
    id: string
  ): Promise<firestore.DocumentData | undefined> {
    const user = await this._userRef.doc(id).get()

    return user.data()
  }

  private async _getDetailUsersData (iList: IList): Promise<IUser[]> {
    const length = iList?.applicants?.length as number
    const users: IUser[] = []
    let user: firestore.DocumentData | undefined

    try {
      for (let i = 0; i < length; i++) {
        // eslint-disable-next-line no-await-in-loop
        user = await this._getDetailUserData(
          (iList?.applicants as string[])[i] as string
        )
        const userData = {
          ...user,
          id: (iList?.applicants as string[])[i]
        } as IUser

        users.push(userData)
      }

      return users
    } catch (error) {
      console.error(error)

      throw new httpErrors.InternalServerError(EFL.errorGettingLists)
    }
  }

  private async _getNumberOfList (): Promise<number> {
    const lists = await this._listRef
      .where('owner', '==', this._args.owner as string)
      .get()

    return lists.docs.length
  }

  public async enroll (userData: IUser): Promise<void> {
    try {
      await this._listRef.doc(this._args.id as string).update({
        applicants: firestore.FieldValue.arrayUnion(userData.id as string)
      })
    } catch (error) {
      console.error(error)

      throw userData.condition === 'teacher'
        ? new httpErrors.InternalServerError(`${EFL.errorEnrolling}${CFU.pTeacher}`)
        : new httpErrors.InternalServerError(`${EFL.errorEnrolling}${CFU.pStudent}`)
    }
  }

  public async getListData (): Promise<IList> {
    const list = await this._listRef.doc(this._args.id as string).get()

    if (!list.data()) throw new httpErrors.NotFound(EFL.missingList)

    return {
      ...list.data(),
      id: this._args.id
    } as IList
  }
}

export { List }
