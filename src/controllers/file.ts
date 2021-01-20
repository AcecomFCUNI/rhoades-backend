/* eslint-disable no-extra-parens */
import httpErrors from 'http-errors'
import { CustomNodeJSGlobal } from '../custom'
import { IFile, IList, IUser } from '../interfaces'
import { FileModel } from '../database/mongo/models'
import { DtoFile } from '../dto-interfaces'
import { EFF, errorHandling } from './utils'

declare const global: CustomNodeJSGlobal

class File {
  private _args: DtoFile
  private _usersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >
  private _listsRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: DtoFile) {
    this._args = args
    this._usersRef = global.firestoreDB.collection('users')
    this._listsRef = global.firestoreDB.collection('lists')
  }

  public process (
    type: string
  ):
    | Promise<IFile>
    | Promise<IFile[]>
    | Promise<string>
    | undefined
  {
    switch (type) {
      case 'download':
        return this._download()
      case '_getFilesDataByList':
        return this._getFilesDataByList()
      case 'upload':
        return this._upload()
      default:
        return undefined
    }
  }

  private async _download (): Promise<IFile> {
    try {
      const [listData, ownerData] = await Promise.all([
        this._getDataFromListOrUser('list') as Promise<IList>,
        this._getDataFromListOrUser('user') as Promise<IUser>
      ])

      if (listData.owner !== ownerData.id)
        throw new httpErrors.Forbidden(EFF.forbidden1)

      const result = await FileModel.findById(
        this._args.id as string,
        '-_id data name'
      )

      if (!result) throw new httpErrors.NotFound(EFF.fileNotFound)

      return result
    } catch (error) {
      return errorHandling(error)
    }
  }

  private async _getFilesDataByList (): Promise<IFile[]> {
    try {
      const [listData, ownerData] = await Promise.all([
        this._getDataFromListOrUser('list') as Promise<IList>,
        this._getDataFromListOrUser('user') as Promise<IUser>
      ])

      if (listData.owner !== ownerData.id)
        throw new httpErrors.Forbidden(EFF.forbidden1)

      const result = await FileModel.find(
        { list: this._args.list as string },
        '-_id -data'
      )

      return result
    } catch (error) {
      return errorHandling(error, EFF.genericGetDataFiles)
    }
  }

  private async _upload (): Promise<IFile> {
    try {
      const [listData, ownerData] = await Promise.all([
        this._getDataFromListOrUser('list') as Promise<IList>,
        this._getDataFromListOrUser('user') as Promise<IUser>
      ])

      if (listData.owner !== ownerData.id)
        throw new httpErrors.Forbidden(EFF.forbidden1)

      if (listData.closed)
        throw new httpErrors.Conflict(EFF.listClosed)

      if (!(this._args.mimetype as string).includes('pdf'))
        throw new httpErrors.BadRequest(EFF.formatNotAllowed)

      const newFile = new FileModel({ ...this._args })
      const file = await newFile.save()

      return file
    } catch (error) {
      return errorHandling(error, EFF.genericUpload)
    }
  }

  private async _getDataFromListOrUser (
    value: 'list' | 'user'
  ): Promise<IList | IUser> {
    let result: IList | IUser

    if (value === 'list') {
      const list = await this._listsRef.doc(this._args.list as string).get()

      if (!list.data()) throw new httpErrors.NotFound(EFF.listNotFound)

      result = {
        ...list.data(),
        id: this._args.list
      } as IList
    } else {
      const user = await this._usersRef.doc(this._args.owner as string).get()

      if (!user.data()) throw new httpErrors.NotFound(EFF.userNotFound)

      result = {
        ...user.data(),
        id: this._args.owner
      }
    }

    return result
  }
}

export { File }
