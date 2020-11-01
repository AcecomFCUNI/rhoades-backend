/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from 'firebase-admin'
import { CustomNodeJSGlobal } from '../custom/global'
import { List } from './list'
import { DtoUser } from '../dto-interfaces/user.dto'
import { DtoList } from '../dto-interfaces/list.dto'
import { IUser } from '../interfaces/user'
import { CFU, EFU, MFU } from './utils/user.messages'
import { encryptMessage, generatePassword } from '../utils/security'
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

  public process (
    type   : string,
    listId?: string,
  ): Promise<string> | undefined {
    switch (type) {
      case 'enrollStudent':
        return this._enroll('student', listId as string)
      case 'enrollTeacher':
        return this._enroll('teacher', listId as string)
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

  private async _enroll (
    condition: string,
    listId   : string,
  ): Promise<string> {
    const document = this._args?.documentType === '0'? 'documentNumber' : 'UNICode'
    let user: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>

    try {
      if (condition === 'teacher')
        user = await this._teachersRef
          .where(document, '==', `${this._args?.documentNumber}`)
          .get()
      else
        user = await this._studentsRef
          .where(document, '==', `${this._args?.documentNumber}`)
          .get()

      const userData = user.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })[0]

      if ('postulating' in userData && userData.postulating)
        throw condition === 'teacher'
          ? new Error(`${CFU.article}${CFU.teacher}${EFU.errorEnrolling1}`)
          : new Error(`${CFU.article}${CFU.student}${EFU.errorEnrolling1}`)

      if ('password' in userData && userData.password)
        throw condition === 'teacher'
          ? new Error(`${CFU.article}${CFU.teacher}${EFU.errorEnrolling2}`)
          : new Error(`${CFU.article}${CFU.student}${EFU.errorEnrolling2}`)

      if (condition === 'teacher')
        await this._teachersRef
          .doc(userData.id as string)
          .update({
            list       : listId,
            postulating: true
          })
      else
        await this._studentsRef
          .doc(userData.id as string)
          .update({
            list       : listId,
            postulating: true
          })

      const l = new List({
        id   : listId,
        owner: userData.id as string,
        type : condition
      } as DtoList)

      await l.enroll(userData.id as string, condition)

      return encryptMessage(JSON.stringify(userData), KEY_JSON)
    } catch (error) {
      console.error(error)

      if (
        error.message === `${CFU.article}${CFU.teacher}${EFU.errorEnrolling1}` ||
        error.message === `${CFU.article}${CFU.student}${EFU.errorEnrolling1}`
      )
        throw error

        throw condition === 'teacher'
          ? new Error(`${EFU.errorEnrolling}${CFU.pTeacher}`)
          : new Error(`${EFU.errorEnrolling}${CFU.pStudent}`)
    }
  }

  private async _notify (condition: string): Promise<string> {
    // eslint-disable-next-line max-len
    let result: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    let hasEmail = false

    try {
      const newPassword = generatePassword(KEY_PASSWORD)
      if (condition === 'teacher')
        result = await this._teachersRef.doc(this._args.id as string).get()
      else
        result = await this._studentsRef.doc(this._args.id as string).get()

      const data = {
        ...result.data(),
        id: this._args.id
      } as IUser

      // Verify if the user has email
      if ('mail' in data && data.mail !== '') {
        hasEmail = true
        await mail(data.mail as string, newPassword.password)
      } else if ('optionalMail' in data && data.optionalMail !== '')
        await mail(data.optionalMail as string, newPassword.password)
      else
        throw new Error(EFU.userHasNotMail)

      // Updating that the user is registered
      if (condition === 'teacher')
        await this._teachersRef
          .doc(data.id as string)
          .update({ registered: true })
      else
        await this._studentsRef
          .doc(data.id as string)
          .update({ registered: true })

      // Registering the user into Firebase Authentication
      await admin.auth().createUser({
        email   : hasEmail ? data.mail: data.optionalMail,
        password: newPassword.password
      })

      return encryptMessage(MFU.updateAndNotifySuccess, KEY_JSON)
    } catch (error) {
      console.log(error)

      if (error.message === MFME.generic)
        throw error

      throw new Error(EFU.errorNotifying)
    }
  }

  private async _verifyUser (condition: string): Promise<string> {
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

      return encryptMessage(JSON.stringify(this._result[0]), KEY_JSON)
    } catch (error) {
      console.error(error)

      if (
        error.message === EFU.teacherNotFound ||
        error.message === EFU.studentNotFound
      )
        throw error

      throw condition === 'teacher'
        ? new Error(`${EFU.errorVerifying}${CFU.pTeacher}`)
        : new Error(`${EFU.errorVerifying}${CFU.pStudent}`)
    }
  }
}

export { User }
