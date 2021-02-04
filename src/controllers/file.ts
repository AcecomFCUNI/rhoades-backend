/* eslint-disable no-extra-parens */
import httpErrors from 'http-errors'
import Zip from 'adm-zip'
import { CustomNodeJSGlobal } from '../custom'
import { IFile, IList, IUser } from '../interfaces'
import { FileModel } from '../database/mongo/models'
import { DtoFile } from '../dto-interfaces'
import { EFF, errorHandling, MFF } from './utils'

declare const global: CustomNodeJSGlobal

interface ICustomZip {
  name: string
  zip : Buffer
}

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
    | Promise<ICustomZip>
    | Promise<string>
    | undefined
  {
    switch (type) {
      case 'delete':
        return this._delete()
      case 'download':
        return this._download()
      case 'downloadAllDocumentsFromList':
        return this._downloadAllDocumentsFromList()
      case 'getFilesDataByList':
        return this._getFilesDataByList()
      case 'upload':
        return this._upload()
      default:
        return undefined
    }
  }

  private async _delete (): Promise<string> {
    try {
      const [list] = await this._validateListAndOwner()

      if (list.id !== this._args.list)
        throw new httpErrors.BadRequest(EFF.listConflict)

      if (list.closed)
        throw new httpErrors.Conflict(EFF.listClosed)

      await FileModel.findByIdAndDelete(this._args.id as string)

      return MFF.genericSuccess2
    } catch (error) {
      return errorHandling(error, EFF.genericDownload)
    }
  }

  private async _download (): Promise<IFile> {
    try {
      const result = await FileModel.findById(
        this._args.id as string,
        '-_id data name list'
      )

      if (!result) throw new httpErrors.NotFound(EFF.fileNotFound)

      this._args.list = result.list

      await this._validateListAndOwner()

      return result
    } catch (error) {
      return errorHandling(error, EFF.genericDownload)
    }
  }

  private async _downloadAllDocumentsFromList (): Promise<ICustomZip> {
    try {
      const [, owner] = await this._validateListAndOwner()

      const result = await FileModel.find({
        list: this._args.list
      })

      console.log(result)

      const zip = new Zip()

      result.forEach(file => zip.addFile(file.name, file.data))

      return {
        name: `${owner.names} ${owner.lastName} ${owner.secondLastName}`,
        zip : zip.toBuffer()
      } as ICustomZip
    } catch (error) {
      return errorHandling(error, EFF.genericDownload2)
    }
  }

  private async _getFilesDataByList (): Promise<IFile[]> {
    try {
      await this._validateListAndOwner()

      const result = await FileModel.find(
        { list: this._args.list as string },
        '-data -__v'
      )

      return result
    } catch (error) {
      return errorHandling(error, EFF.genericGetDataFiles)
    }
  }

  private async _upload (): Promise<IFile> {
    try {
      const [listData] = await this._validateListAndOwner()

      if (listData.closed)
        throw new httpErrors.Conflict(EFF.listClosed)

      if (!(this._args.mimetype as string).includes('pdf'))
        throw new httpErrors.BadRequest(EFF.formatNotAllowed)

      const newFile = new FileModel({ ...this._args })
      const file = await newFile.save()

      return {
        createdAt: file.createdAt,
        // eslint-disable-next-line no-underscore-dangle
        id       : file._id,
        name     : file.name
      } as IFile
    } catch (error) {
      return errorHandling(error, EFF.genericUpload)
    }
  }

  private async _validateListAndOwner (): Promise<[IList, IUser]> {
    const [listData, ownerData] = await Promise.all([
      this._getDataFromListOrUser('list') as Promise<IList>,
      this._getDataFromListOrUser('user') as Promise<IUser>
    ])

    if (!ownerData.registered)
      throw new httpErrors.Forbidden(EFF.forbidden2)

    if (listData.owner !== ownerData.id)
      throw new httpErrors.Forbidden(EFF.forbidden1)

    return [listData, ownerData]
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

export { File, ICustomZip }
