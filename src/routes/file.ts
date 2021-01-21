import httpErrors from 'http-errors'
import upload from 'express-fileupload'
import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom'
import { response } from '../utils'
import { File as FileC } from '../controllers'
import { DtoFile } from '../dto-interfaces'
import {
  fileIdAndOwnerSchema,
  fileIdListAndOwnerSchema,
  listFinishRegistrationSchema
} from '../schemas'
import { IFile } from '../interfaces'

const File = Router()

File.route('/file/upload/:list/:owner')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (req.files) {
        const { files, params: { list, owner } } = req
        const file = Object.keys(files)[0]
        const fileObj: upload.UploadedFile = files[file] as upload.UploadedFile
        try {
          await listFinishRegistrationSchema.validateAsync({ id: list, owner })

          const fileToUpload: DtoFile = {
            data    : fileObj.data,
            encoding: fileObj.encoding,
            list,
            mimetype: fileObj.mimetype,
            name    : fileObj.name,
            owner,
            size    : fileObj.size
          }
          const f = new FileC(fileToUpload)
          const result = await f.process('upload') as IFile

          response(false, { result }, res, 201)
        } catch (error) {
          if (error.isJoi) error.status = 422
          next(error)
        }
      } else
        next(new httpErrors.BadRequest('Missing file'))
    }
  )

File.route('/file/getData/:list/:owner')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { list, owner } } = req
      try {
        await listFinishRegistrationSchema.validateAsync({ id: list, owner })
        const file: DtoFile = { list, owner }
        const f = new FileC(file)
        const result = await f.process('getFilesDataByList')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

File.route('/file/download/:id/:owner')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { id, owner } } = req
      try {
        const file: DtoFile = { id, owner }
        await fileIdAndOwnerSchema.validateAsync(file)

        const f = new FileC(file)
        const result = await f.process('download') as IFile

        // To download it directly
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${result.name}"`
        )

        // To open it in a new tab
        // res.setHeader(
        //   'Content-Disposition',
        //   `inline; filename="${result.name}"`
        // )

        res.setHeader('Content-Type', 'application/pdf')
        res.status(200).send(result.data)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

File.route('/file/delete/:id/:list/:owner')
  .patch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { id, list, owner } } = req
      const file: DtoFile = { id, list, owner }
      try {
        await fileIdListAndOwnerSchema.validateAsync(file)
        const f = new FileC(file)
        const result = await f.process('delete')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { File }
