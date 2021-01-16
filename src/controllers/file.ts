/* eslint-disable no-extra-parens */
import httpErrors from 'http-errors'
import { IFile, FileModel } from '../database/mongo/models'
import { DtoFile } from '../dto-interfaces'
import { EFF, errorHandling } from './utils'

class File {
  private _args: DtoFile

  constructor (args: DtoFile) {
    this._args = args
  }

  public process (type: string): Promise<IFile> | Promise<IFile[]> | undefined {
    switch (type) {
      case 'getDataFilesByList':
        return this._getFilesDataByList()
      case 'upload':
        return this._upload()
      default:
        return undefined
    }
  }

  private async _getFilesDataByList (): Promise<IFile[]> {
    try {
      const result = await FileModel.find(
        { list: this._args.list },
        '-_id -data'
      )

      return result
    } catch (error) {
      return errorHandling(error, EFF.genericGetDataFiles)
    }
  }

  private async _upload (): Promise<IFile> {
    try {
      if (!(this._args.mimetype as string).includes('pdf'))
        throw new httpErrors.BadRequest(EFF.formatNotAllowed)

      const newFile = new FileModel({ ...this._args })
      const result = await newFile.save()

      return result
    } catch (error) {
      return errorHandling(error, EFF.genericUpload)
    }
  }
}

export { File }
