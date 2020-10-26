/* eslint-disable no-extra-parens */
import firestore from '@google-cloud/firestore'
import { CustomNodeJSGlobal } from '../custom/global'
import { DtoList } from '../dto-interfaces/list.dto'
import { IList } from '../interfaces/list'
import { EFL } from './utils/list.messages'
import { CFU } from './utils/user.messages'
import { encryptMessage } from '../utils/security'
import { PATA } from '../utils/constants'
import { IUser } from '../interfaces/user'

declare const global: CustomNodeJSGlobal
const KEY_JSON = process.env.KEY_JSON as string

class List {
  private _args: DtoList
  private _listRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: DtoList) {
    this._args = args
    this._listRef = global.firestoreDB.collection('lists')
  }

  public process (type: string): Promise<unknown> | undefined {
    switch (type) {
      case 'createList':
        return this._createList()
      case 'getListsOfUser':
        return this._getListsOfUser()
      default:
        return undefined
    }
  }

  private async _createList (): Promise<string> {
    try {
      const list = await this._listRef
        .add({
          applicants: [],
          owner     : this._args.owner,
          type      : this._args.type
        })

      const dataList = {
        ...(await list.get()).data(),
        id: list.id
      }

      return encryptMessage(JSON.stringify(dataList), KEY_JSON)
    } catch (error) {
      console.error(error)

      throw new Error(EFL.errorCreating)
    }
  }

  private async _getListsOfUser (): Promise<unknown> {
    try {
      const lists = await this._listRef.where('owner', '==', this._args.owner as string).get()
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
          'teachers',
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
          'students',
          studentLists[0]
        )

      const finalResult = {
        students: studentLists[0],
        teachers: teacherLists[0]
      }

      return finalResult
      // return encryptMessage(JSON.stringify(finalResult), KEY_JSON)
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
    const collectionRef =  global.firestoreDB.collection(condition)
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
      throw new Error('User does not exists')
    }
  }

  public async enroll (
    idUser   : string,
    condition: string
  ): Promise<void> {
    try {
      await this._listRef.doc(this._args.id as string).update({
        applicants: firestore.FieldValue.arrayUnion(idUser)
      })

    } catch (error) {
      console.error(error)

      throw condition === 'teacher'
        ? new Error(`${EFL.errorEnrolling}${CFU.pTeacher}`)
        : new Error(`${EFL.errorEnrolling}${CFU.pStudent}`)
    }
  }
}

export { List }
