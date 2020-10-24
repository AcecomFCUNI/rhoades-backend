/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore from '@google-cloud/firestore'
import { CustomNodeJSGlobal } from '../custom/global'
import { DtoUser } from '../dto-interfaces/user.dto'
import { IUser } from '../interfaces/user'
import { EFU } from './utils/error.messages'
import { generatePassword } from '../utils/security'
import { mail } from '../utils/mailer'
import { MFME } from '../utils/messages'

declare const global: CustomNodeJSGlobal
const KEY_PASSWORD = process.env.KEY_PASSWORD as string
const KEY_JSON = process.env.KEY_JSON as string

class User {
  private _args: DtoUser
  private _studentsRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >
  private _teachersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >
  private _result: IUser[]

  constructor (args: DtoUser) {
    this._args = args
    this._studentsRef = global.firestoreDB.collection('students')
    this._teachersRef = global.firestoreDB.collection('teachers')
    this._result = []
  }

  public process (type: string): unknown {
    switch (type) {
      case 'notifyStudent':
        return this._notify('student')
      case 'notifyTeacher':
        return this._notify('teacher')
      case 'verifyStudent':
        return this._verifyUser('student')
      case 'verifyTeacher':
        return this._verifyUser('teacher')
      default:
        return undefined
    }
  }

  private async _notify (condition: string): Promise<unknown> {
    let result: any

    try {
      const newPassword = generatePassword(KEY_PASSWORD)
      // Verify if the user has email
      if (condition === 'teacher')
        result = await this._teachersRef.doc(this._args.id as string).get()
      else
        result = await this._studentsRef.doc(this._args.id as string).get()

      const data = {
        ...result.data(),
        id: this._args.id
      } as IUser

      if ('mail' in data && data.mail !== '')
        await mail(data.mail as string, newPassword.password)
      else if ('optionalMail' in data && data.optionalMail !== '')
        await mail(data.optionalMail as string, newPassword.password)
      else
        throw new Error(EFU.userHasNotMail)

      // Updating password
      if (condition === 'teacher')
        result = await this._teachersRef
          .doc(this._args.id as string)
          .update({ password: newPassword.ePassword })
      else
        result = await this._studentsRef
          .doc(this._args.id as string)
          .update({ password: newPassword.ePassword })

      return result
    } catch (error) {
      console.log(error)
      if (error.message === MFME.generic)
        throw error

      throw new Error(EFU.errorUpdating)
    }
  }

  private async _verifyUser (condition: string): Promise<IUser> {
    const document = this._args?.documentType === '0' ? 'documentNumber' : 'UNICode'
    let result: any

    try {
      if (condition === 'teacher')
        result = await this._teachersRef
          .where(document, '==', `${this._args?.documentNumber}`)
          .get()
      else
        result = await this._studentsRef
          .where(document, '==', `${this._args?.documentNumber}`)
          .get()

      if (result.docs.length === 0)
        if (condition === 'teacher') throw new Error(EFU.teacherNotFound)
        else throw new Error(EFU.studentNotFound)

      result.docs.forEach((doc: any) => {
        this._result.push({
          ...doc.data(),
          id: doc.id
        } as IUser)
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
