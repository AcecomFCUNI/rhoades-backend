/* eslint-disable no-extra-parens */
import httpErrors from 'http-errors'
import { IFile, FileModel } from '../database/mongo/models'
import { DtoFile } from '../dto-interfaces'
import { EFF, MFF, errorHandling } from './utils'

class File {
  private _args: DtoFile

  constructor (args: DtoFile) {
    this._args = args
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
      const result = await FileModel.find(
        { list: this._args.list as string },
        '-_id -data'
      )

      return result
    } catch (error) {
      return errorHandling(error, EFF.genericGetDataFiles)
    }
  }

  private async _upload (): Promise<string> {
    try {
      if (!(this._args.mimetype as string).includes('pdf'))
        throw new httpErrors.BadRequest(EFF.formatNotAllowed)

      const newFile = new FileModel({ ...this._args })
      await newFile.save()

      return MFF.genericSuccess1
    } catch (error) {
      return errorHandling(error, EFF.genericUpload)
    }
  }
}

export { File }
