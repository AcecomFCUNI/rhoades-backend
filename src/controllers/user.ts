/* eslint-disable @typescript-eslint/no-explicit-any */
// import firestore from '@google-cloud/firestore'
import { CustomNodeJSGlobal } from '../custom/global'
import { DtoUser } from '../dto-interfaces/user.dto'
import { IUser } from '../interfaces/user'
import { EFU } from './utils/error.messages'

declare const global: CustomNodeJSGlobal

class User {
  private _args: DtoUser
  private _studentsRef: FirebaseFirestore
    .CollectionReference<
      FirebaseFirestore.DocumentData
    >
  private _teachersRef: FirebaseFirestore
    .CollectionReference<
      FirebaseFirestore.DocumentData
    >
  private _result: IUser[]

  constructor (args: DtoUser) {
    this._args = args
    this._studentsRef = global.firestoreDB.collection('students')
    this._teachersRef = global.firestoreDB.collection('teachers')
    this._result = []
  }

  public process (
    type: string
  ): unknown {
    switch (type) {
      case 'verifyStudent':
        return this._verifyUser('student')
      case 'verifyTeacher':
        return this._verifyUser('teacher')
      default:
        return undefined
    }
  }

  private async _verifyUser (condition: string): Promise<IUser> {
    const document = this._args?.documentType === '0' ? 'documentNumber' : 'UNICode'
    let result: any

    try {
      if (condition === 'teacher')
        result = await this._teachersRef
          .where(document, '==', `${this._args?.documentNumber}`).get()
      else
        result = await this._studentsRef
          .where(document, '==', `${this._args?.documentNumber}`).get()

      if (result.docs.length === 0)
        if (condition === 'teacher')
          throw new Error(EFU.teacherNotFound)
        else
          throw new Error(EFU.studentNotFound)

      result.docs.forEach((doc: any) => {
        this._result.push({ ...doc.data() } as IUser)
      })

      return this._result[0]
    } catch (error) {
      if (
        error.message === EFU.teacherNotFound ||
        error.message === EFU.studentNotFound
      )
        throw error

      console.error(error)
      throw new Error(`There was a error verifying the ${condition}`)
    }
  }
}

export { User }
