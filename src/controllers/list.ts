/* eslint-disable no-extra-parens */
import firestore from '@google-cloud/firestore'
import httpErrors from 'http-errors'
import { CustomNodeJSGlobal } from '../custom/index'
import { DtoList } from '../dto-interfaces/index'
import { CFU, EFL, EFU } from './utils/index'
import { PATA } from '../utils/constants'
import { IList, IUser } from '../interfaces/index'

declare const global: CustomNodeJSGlobal

class List {
  private _args: DtoList
  private _listRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: DtoList) {
    this._args = args
    this._listRef = global.firestoreDB.collection('lists')
  }

  public process (
    type: string
  ):
    | Promise<IList>
    | Promise<{
        students: IList
        teachers: IList
      }>
    | undefined {
    switch (type) {
      case 'createList':
        return this._createList()
      case 'getListsOfUser':
        return this._getListsOfUser()
      default:
        return undefined
    }
  }

  private async _createList (): Promise<IList> {
    try {
      const list = await this._listRef.add({
        applicants: [],
        owner     : this._args.owner,
        type      : this._args.type
      })

      const dataList = {
        ...(await list.get()).data(),
        id: list.id
      } as IList

      return dataList
    } catch (error) {
      console.error(error)

      throw new httpErrors.InternalServerError(EFL.errorCreating)
    }
  }

  private async _getListsOfUser (): Promise<{
    students: IList
    teachers: IList
  }> {
    try {
      const lists = await this._listRef
        .where('owner', '==', this._args.owner as string)
        .get()
      const listsData = lists.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        } as IList
      })

      const teacherLists = listsData.filter(list => {
        if (
          list.type === PATA.au ||
          list.type === PATA.fc ||
          list.type === PATA.cu ||
          list.type === PATA.d ||
          list.type === PATA.r
        )
          return list

        return undefined
      })

      if (teacherLists.length > 0)
        teacherLists[0].applicants = await this._getDetailUserData(
          'teacher',
          teacherLists[0]
        )

      const studentLists = listsData.filter(list => {
        if (
          list.type === PATA.tof ||
          list.type === PATA.tua ||
          list.type === PATA.tuc
        )
          return list

        return undefined
      })

      if (studentLists.length > 0)
        studentLists[0].applicants = await this._getDetailUserData(
          'student',
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

  // eslint-disable-next-line class-methods-use-this
  private async _getDetailUserData (
    condition: string,
    iList    : IList
  ): Promise<IUser[]> {
    const collectionRef = global.firestoreDB.collection('users')
    const length = iList?.applicants?.length as number
    const users: IUser[] = []
    let user: firestore.DocumentSnapshot<firestore.DocumentData>

    try {
      for (let i = 0; i < length; i++) {
        // eslint-disable-next-line no-await-in-loop
        user = await collectionRef
          .doc((iList?.applicants as string[])[i] as string)
          .get()
        const userData = {
          ...user.data(),
          id: (iList?.applicants as string[])[i]
        } as IUser

        users.push(userData)
      }

      return users
    } catch (error) {
      console.error(error)

      throw condition === 'teacher'
        ? new httpErrors.BadRequest(EFU.teacherNotFound)
        : new httpErrors.BadRequest(EFU.studentNotFound)
    }
  }

  public async enroll (idUser: string, condition: string): Promise<void> {
    try {
      await this._listRef.doc(this._args.id as string).update({
        applicants: firestore.FieldValue.arrayUnion(idUser)
      })
    } catch (error) {
      console.error(error)

      throw condition === 'teacher'
        ? new httpErrors.InternalServerError(`${EFL.errorEnrolling}${CFU.pTeacher}`)
        : new httpErrors.InternalServerError(`${EFL.errorEnrolling}${CFU.pStudent}`)
    }
  }
}

export { List }
