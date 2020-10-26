import firestore from '@google-cloud/firestore'
import { CustomNodeJSGlobal } from '../custom/global'
import { DtoList } from '../dto-interfaces/list.dto'
import { EFL } from './utils/list.messages'
import { CFU } from './utils/user.messages'
import { encryptMessage } from '../utils/security'

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
      default:
        return undefined
    }
  }

  private async _createList (): Promise<unknown> {
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
