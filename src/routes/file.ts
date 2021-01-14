import httpErrors from 'http-errors'
import upload from 'express-fileupload'
import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom'
import { response } from '../utils'
import { File as FileC } from '../controllers'
import { DtoFile } from '../dto-interfaces'
import { listIdSchema } from '../schemas'

const File = Router()

File.route('/file/upload/:list')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (req.files) {
        const { files, params: { list } } = req
        const file = Object.keys(files)[0]
        const fileObject = files[file] as upload.UploadedFile
        try {
          await listIdSchema.validateAsync({ id: list })

          const fileToUpload = {
            data    : fileObject.data,
            encoding: fileObject.encoding,
            list,
            mimetype: fileObject.mimetype,
            name    : fileObject.name,
            size    : fileObject.size
          } as DtoFile
          const f = new FileC(fileToUpload)
          const result = await f.process('upload')

          response(false, { result }, res, 201)
        } catch (error) {
          if (error.isJoi) error.status = 422
          next(error)
        }
      } else
        next(new httpErrors.BadRequest('Missing file'))
    }
  )

export { File }
