import httpErrors from 'http-errors'
import { IFile, FileModel } from '../database/mongo/models'
import { DtoFile } from '../dto-interfaces'
import { EFF, errorHandling } from './utils'

class File {
  private _args: DtoFile

  constructor (args: DtoFile) {
    this._args = args
  }

  public process (type: string): Promise<IFile> | undefined {
    switch (type) {
      case 'upload':
        return this._upload()
      default:
        return undefined
    }
  }

  private async _upload (): Promise<IFile> {
    const {
      data,
      encoding,
      list,
      mimetype,
      name,
      size
    } = this._args

    try {
      if (!mimetype.includes('pdf'))
        throw new httpErrors.BadRequest(EFF.formatNotAllowed)

      const newFile = new FileModel({
        data,
        encoding,
        list,
        mimetype,
        name,
        size
      })
      const result = await newFile.save()

      return result
    } catch (error) {
      return errorHandling(error)
    }
  }
}

export { File }
