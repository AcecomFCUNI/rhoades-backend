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
    | Promise<IList[]>
    | Promise<Record<string, unknown>>
    | undefined {
    switch (type) {
      case 'createList':
        return this._createList()
      case 'filter':
        return this._filter()
      case 'finishRegistration':
        return this._finishRegistration()
      case 'getListsOfUser':
        return this._getListsOfUser()
      default:
        return undefined
    }
  }

  private async _filter (): Promise<IList[]> {
    let lists: firestore.QuerySnapshot<firestore.DocumentData>
    try {
      if (!this._args.faculty)
        lists = await this._listRef
          .where('type', '==', this._args.type as string)
          .get()
      else
        lists = await this._listRef
          .where('type', '==', this._args.type as string)
          .where('faculty', '==', this._args.faculty as string)
          .get()

      const listsData: IList[] = []
      for (let i = 0; i < lists.docs.length; i++) {
        const list = {
          ...lists.docs[i].data(),
          id: lists.docs[i].id
        } as IList

        // eslint-disable-next-line no-await-in-loop
        list.applicants = await this._getDetailUsersData(list)
        listsData.push(list)
      }

      return listsData
    } catch (error) {
      console.error(error)

      throw new httpErrors.InternalServerError(EFL.errorCreating)
    }
  }

  private async _createList (): Promise<IList> {
    let list: firestore.DocumentReference<firestore.DocumentData>
    try {
      const owner = await this._getDetailUserData(this._args.owner as string)

      // Validating that the owner exists
      if (!owner) throw new httpErrors.NotFound(EFL.missingOwner)

      // Validating that the owner is a procurator
      const ownerData = {
        ...owner,
        id: this._args.owner
      } as IUser
      if (!ownerData.registered)
        throw new httpErrors.Unauthorized(EFL.unauthorizedRegistration)

      // Getting the lists of the user to validate if he can or not register a new one
      const lists = await this._getListsOfUser(ownerData.id)

      switch (this._args.type) {
        case PATA.d:
        case PATA.fc:
        case PATA.tof:
          // Validating conditions to create a list for a faculty
          this._validateCreationList(ownerData, lists, true)

          list = await this._listRef.add({
            applicants: [],
            closed    : false,
            faculty   : this._args.faculty,
            owner     : this._args.owner,
            type      : this._args.type
          })
          break
        default:
          // Validating conditions to create a list for the university
          this._validateCreationList(ownerData, lists)

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
        case EFL.differentFaculty:
        case EFL.limitList:
        case EFL.missingOwner:
        case EFL.unauthorizedRegistration:
        case EFL.teacherListAlready:
        case EFL.studentListAlready:
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
      console.error(error)

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

  private async _getListsOfUser (
    ownerId?: string
  ): Promise<Record<string, unknown>> {
    let lists: firestore.QuerySnapshot<firestore.DocumentData>
    try {
      if (ownerId)
        lists = await this._listRef
          .where('owner', '==', ownerId)
          .get()
      else
        lists = await this._listRef
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

      if (studentLists[0] && teacherLists[0])
        return {
          students: studentLists[0],
          teachers: teacherLists[0]
        }

      if (teacherLists[0])
        return {
          teachers: teacherLists[0]
        }

      if (studentLists[0])
        return {
          students: studentLists[0]
        }

      return {}
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

  private _validateCreationList (
    ownerData: IUser,
    lists    : Record<string, unknown>,
    faculty? : boolean
  ): void {
    if (faculty) {
      // Validating that the owner belongs to the faculty that he is trying to register
      if (ownerData.faculty !== this._args.faculty)
        throw new httpErrors.Forbidden(EFL.differentFaculty)

      // Validating that the owner doesn't have another list of teachers
      if ('teachers' in lists && (this._args.type === PATA.d || this._args.type === PATA.fc))
        throw new httpErrors.Conflict(EFL.teacherListAlready)

      // Validating that the owner doesn't have another list of students
      if ('students' in lists && this._args.type === PATA.tof)
        throw new httpErrors.Conflict(EFL.studentListAlready)
    }

    // Validating that the owner doesn't have another list of teachers
    if ('teachers' in lists && (this._args.type === PATA.r || this._args.type === PATA.ua))
      throw new httpErrors.Conflict(EFL.teacherListAlready)

    // Validating that the owner doesn't have another list of students
    if ('students' in lists && (this._args.type === PATA.uta || this._args.type === PATA.utc))
      throw new httpErrors.Conflict(EFL.studentListAlready)
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
