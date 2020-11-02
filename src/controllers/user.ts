/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from 'firebase-admin'
import { CustomNodeJSGlobal } from '../custom/global'
import { List } from './list'
import { DtoUser } from '../dto-interfaces/user.dto'
import { DtoList } from '../dto-interfaces/list.dto'
import { IUser } from '../interfaces/user'
import { CFU, EFU, MFU } from './utils/user.messages'
import { generatePassword } from '../utils/security'
import { mail } from '../utils/mailer'
import { MFME } from '../utils/messages'

declare const global: CustomNodeJSGlobal
const KEY_PASSWORD = process.env.KEY_PASSWORD as string
class User {
  private _args: DtoUser
  private _usersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >
  private _result: IUser[]

  constructor (args: DtoUser) {
    this._args = args
    this._usersRef = global.firestoreDB.collection('users')
    this._result = []
  }

  public process (
    type      : string,
    condition?: string,
    listId?   : string
  ): Promise<IUser> | Promise<string> | undefined {
    switch (type) {
      case 'enrollStudent':
        return this._enroll('student', listId as string)
      case 'enrollTeacher':
        return this._enroll('teacher', listId as string)
      case 'notify':
        return this._notify()
      case 'verify':
        return this._verify(condition as string)
      default:
        return undefined
    }
  }

  private async _enroll (condition: string, listId: string): Promise<IUser> {
    const document = this._args?.documentType === '0' ? 'documentNumber' : 'UNICode'
    let user: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>

    try {
      user = await this._usersRef
        .where(document, '==', `${this._args?.documentNumber}`)
        .get()

      const userData = user.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id
        } as IUser
      })[0]

      if ('postulating' in userData && userData.postulating)
        throw condition === 'teacher'
          ? new Error(`${CFU.article}${CFU.teacher}${EFU.errorEnrolling1}`)
          : new Error(`${CFU.article}${CFU.student}${EFU.errorEnrolling1}`)

      if ('registered' in userData && userData.registered)
        throw condition === 'teacher'
          ? new Error(`${CFU.article}${CFU.teacher}${EFU.errorEnrolling2}`)
          : new Error(`${CFU.article}${CFU.student}${EFU.errorEnrolling2}`)

      await this._usersRef.doc(userData.id as string).update({
        list       : listId,
        postulating: true
      })

      const l = new List({
        id   : listId,
        owner: userData.id as string,
        type : condition
      } as DtoList)

      await l.enroll(userData.id as string, condition)

      return userData
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

  private async _notify (): Promise<string> {
    // eslint-disable-next-line max-len
    let result: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    let hasEmail = false

    try {
      const newPassword = generatePassword(KEY_PASSWORD)
      result = await this._usersRef.doc(this._args.id as string).get()

      const data = {
        ...result.data(),
        id: this._args.id as string
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
      await this._usersRef
        .doc(data.id as string)
        .update({ registered: true })

      // Registering the user into Firebase Authentication
      await admin.auth().createUser({
        email   : hasEmail ? data.mail: data.optionalMail,
        password: newPassword.password,
        uid     : data.id as string
      })

      return MFU.updateAndNotifySuccess
    } catch (error) {
      console.log(error)

      if (error.message === MFME.generic) throw error

      throw new Error(EFU.errorNotifying)
    }
  }

  private async _verify (condition: string): Promise<IUser> {
    const document = this._args?.documentType === '0' ? 'documentNumber' : 'UNICode'
    let result: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>

    try {
      result = await this._usersRef
        .where(document, '==', `${this._args?.documentNumber}`)
        .get()

      if (result.docs.length === 0)
        if (condition === 'teacher') throw new Error(EFU.teacherNotFound)
        else throw new Error(EFU.studentNotFound)

      result.docs.forEach(
        (
          doc: FirebaseFirestore.QueryDocumentSnapshot<
            FirebaseFirestore.DocumentData
          >
        ) => {
          this._result.push({
            id        : doc.id,
            lastName  : doc.data().lastName,
            mail      : doc.data().mail || doc.data().optionalMail || '',
            names     : doc.data().names,
            registered:
              doc.data().registered === undefined
                ? false
                : doc.data().registered,
            secondLastName: doc.data().secondLastName
          } as IUser)
        }
      )

      return this._result[0]
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
