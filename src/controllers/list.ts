/* eslint-disable no-extra-parens */
import firestore from '@google-cloud/firestore'
import httpErrors from 'http-errors'
import { CustomNodeJSGlobal } from '../custom'
import { DtoList } from '../dto-interfaces'
import { CFU, EFL, EFU, MFL, errorHandling } from './utils'
import {
  PATA,
  notifyProcuratorListReviewed,
  notifyFinishRegistrationList
} from '../utils'
import { IList, IUser } from '../interfaces'

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
    type        : string,
    idCandidate?: string,
    adminId?    : string
  ):
    | Promise<string>
    | Promise<IList>
    | Promise<IList[]>
    | Promise<Record<string, unknown>>
    | Promise<void>
    | undefined {
    switch (type) {
      case 'createList':
        return this._createList()
      case 'deleteList':
        return this._deleteList()
      case 'filter':
        return this._filter()
      case 'finishRegistration':
        return this._finishRegistration()
      case 'getListsOfUser':
        return this._getListsOfUser()
      case 'removeCandidate':
        return this._removeCandidate(idCandidate as string)
      case 'review':
        return this._review(adminId as string)
      default:
        return undefined
    }
  }

  private async _createList (): Promise<IList> {
    let list: firestore.DocumentReference<firestore.DocumentData>
    try {
      const owner = await this._getDetailUserData(this._args.owner as string)

      // Validating that the owner exists
      if (!owner.registered) throw new httpErrors.NotFound(EFL.missingOwner)

      // Validating that the owner is a procurator
      const ownerData = {
        ...owner,
        id: this._args.owner
      } as IUser

      if (!ownerData.registered)
        throw new httpErrors.Forbidden(EFL.forbiddenRegistration)

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
      return errorHandling(error, EFL.errorCreating)
    }
  }

  private async _deleteList (): Promise<string> {
    try {
      const list = await this.getListData()
      const owner = await this._getDetailUserData(this._args.owner as string)

      // Validate if the owner is registered
      if (!owner.registered)
        throw new httpErrors.Forbidden(EFL.missingOwner)

      // Validate if the provided owner is the owner of the list
      if (list.owner !== this._args.owner)
        throw new httpErrors.Forbidden(EFL.forbiddenDeletion)

      if (list.closed)
        throw new httpErrors.Conflict(EFL.alreadyFinishedCanNotDelete)

      if (list.applicants && list.applicants?.length > 0)
        await Promise.all([
          ...(list.applicants as string[]).map(id => {
            return this._userRef.doc(id).update({ postulating: false })
          }),
          this._listRef.doc(this._args.id as string).delete()
        ])
      else
        await this._listRef.doc(this._args.id as string).delete()

      return MFL.deletedListSuccessfully
    } catch (error) {
      return errorHandling(error)
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
      return errorHandling(error, EFL.errorCreating)
    }
  }

  private async _finishRegistration (): Promise<string> {
    try {
      const list = await this.getListData()

      if (list.closed)
        throw new httpErrors.Conflict(EFL.alreadyFinished)

      const owner = await this._getDetailUserData(this._args.owner as string)

      if (!owner.registered)
        throw new httpErrors.NotFound(EFL.missingOwner)

      if (list.owner !== this._args.owner)
        throw new httpErrors.Forbidden(EFL.forbiddenFinish)

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
      return errorHandling(error, EFL.errorFinishingRegistration)
    }
  }

  private async _getListsOfUser (
    ownerId?: string
  ): Promise<Record<string, unknown>> {
    let lists: firestore.QuerySnapshot<firestore.DocumentData>

    const cleanListMembersData = (list: IList): IUser[] => {
      const applicants = list.applicants as IUser[]

      return applicants.length > 0
        ? applicants.map(listMember => ({
          UNICode       : listMember.UNICode,
          // eslint-disable-next-line sort-keys
          documentNumber: listMember.documentNumber,
          documentType  : listMember.documentType,
          faculty       : listMember.faculty,
          id            : listMember.id,
          lastName      : listMember.lastName,
          names         : listMember.names,
          secondLastName: listMember.secondLastName
        }))
        : []
    }

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
          students: {
            ...studentLists[0],
            applicants: cleanListMembersData(studentLists[0])
          },
          teachers: {
            ...teacherLists[0],
            applicants: cleanListMembersData(teacherLists[0])
          }
        }

      if (teacherLists[0])
        return {
          teachers: {
            ...teacherLists[0],
            applicants: cleanListMembersData(teacherLists[0])
          }
        }

      if (studentLists[0])
        return {
          students: {
            ...studentLists[0],
            applicants: cleanListMembersData(studentLists[0])
          }
        }

      return {}
    } catch (error) {
      return errorHandling(error)
    }
  }

  private async _getDetailUserData (
    id: string
  ): Promise<IUser> {
    const user = await this._userRef.doc(id).get()

    if (!user.data()) throw new httpErrors.NotFound(EFU.userNotFound)

    return {
      ...user.data(),
      id
    } as IUser
  }

  private async _getDetailUsersData (iList: IList): Promise<IUser[]> {
    const applicants = iList.applicants as string[]
    let users: IUser[] = []

    try {
      users = await Promise.all(
        applicants.map(applicant => this._getDetailUserData(applicant))
      )

      return users
    } catch (error) {
      return errorHandling(error, EFL.errorGettingLists)
    }
  }

  private async _removeCandidate (idCandidate: string): Promise<string> {
    try {
      const list = await this.getListData()

      // Validate if the owner is registered
      const owner = await this._getDetailUserData(this._args.owner as string)

      if (!owner.registered)
        throw new httpErrors.Forbidden(EFL.missingOwner)

      // Validate if the provided owner is the owner of the list
      if (this._args.owner !== list.owner)
        throw new httpErrors.Forbidden(EFL.forbiddenRemoveCandidate)

      // Validate if the list contains the candidate
      if (!list.applicants?.includes(idCandidate))
        throw new httpErrors.Conflict(EFL.missingUserInList)

      if (list.closed)
        throw new httpErrors.Conflict(EFL.alreadyFinishedCanNotDeleteUser)

      // Deleting user from the list
      await this._listRef.doc(this._args.id as string).update({
        applicants: firestore.FieldValue.arrayRemove(idCandidate)
      })

      // Updating candidate status
      await this._userRef.doc(idCandidate).update({
        postulating: false
      })

      return MFL.deletedUserSuccessfully
    } catch (error) {
      return errorHandling(error)
    }
  }

  private async _review (adminId: string): Promise<string> {
    try {
      const adminUser = await this._getDetailUserData(adminId)
      console.log(adminUser.condition)

      // Validating admin
      if (adminUser.condition !== 'admin')
        throw new httpErrors.Forbidden(EFL.noAdmin)

      if (!adminUser.registered)
        throw new httpErrors.Forbidden(EFL.noAdminRegistered)

      // Validating list closed and reviewed
      const list = await this.getListData()
      if (!list.closed)
        throw new httpErrors.Conflict(EFL.listNotClosed)

      if (
        list.reviewedTimes &&
        list.reviewedTimes === 2 &&
        list.status === 'observed'
      )
        throw new httpErrors.Conflict(EFL.listFinalReview)

      // Validating owner registered
      const owner = await this._getDetailUserData(this._args.owner as string)

      if (!owner.registered)
        throw new httpErrors.Forbidden(EFL.forbiddenRegistration)

      // Notifying procurator and updating the database
      if (this._args.observation)
        await Promise.all([
          notifyProcuratorListReviewed(
            owner,
            this._args.status as string,
            list.type as string,
            this._args.observation,
          ),
          this._listRef.doc(this._args.id as string).update({
            observation  : this._args.observation,
            reviewedTimes: list.reviewedTimes ? list.reviewedTimes++ : 1,
            status       : this._args.status
          })
        ])
      else
        await Promise.all([
          notifyProcuratorListReviewed(
            owner,
            this._args.status as string,
            list.type as string
          ),
          this._listRef.doc(this._args.id as string).update({
            reviewedTimes: list.reviewedTimes ? list.reviewedTimes++ : 1,
            status       : this._args.status
          })
        ])

      return MFL.reviewed
    } catch (error) {
      return errorHandling(error, EFL.errorReviewing)
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
      errorHandling(
        error,
        userData.condition === 'teacher'
          ? `${EFL.errorEnrolling}${CFU.pTeacher}`
          : `${EFL.errorEnrolling}${CFU.pStudent}`
      )
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
