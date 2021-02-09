import httpErrors from 'http-errors'
import upload from 'express-fileupload'
import { NextFunction, Router } from 'express'
import { CustomNodeJSGlobal, Request, Response } from '../custom'
import { response, verifyAccessToken } from '../utils'
import { File as FileC, ICustomZip, User as UserC } from '../controllers'
import { DtoFile, DtoUser } from '../dto-interfaces'
import {
  fileIdAndOwnerSchema,
  fileIdListAndOwnerSchema,
  fileListIdAndOwnerSchema,
  listValidation,
  userIdSchema
} from '../schemas'
import { IFile, IUser } from '../interfaces'
import { EFF } from '../controllers/utils'

declare const global: CustomNodeJSGlobal

const File = Router()

// Safe route
File.route('/file/upload/:list/:owner')
  .post(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (req.files) {
        const { files, params: { list, owner } } = req
        const file = Object.keys(files)[0]
        const fileObj: upload.UploadedFile = files[file] as upload.UploadedFile
        try {
          await listValidation(global.electionCodes)
            .listFinishRegistrationSchema
            .validateAsync({ id: list, owner })

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

// Safe route
File.route('/file/getData/:list/:owner')
  .get(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { list, owner } } = req
      try {
        await listValidation(global.electionCodes)
          .listFinishRegistrationSchema
          .validateAsync({ id: list, owner })

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

// Safe route
File.route('/file/download/:id/:owner')
  .get(
    verifyAccessToken,
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

// Safe route
File.route('/file/downloadAllDocumentsFromList/:idList/:owner')
  .post(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { idList, owner }, body: { args } } = req
      try {
        const file: DtoFile = { list: idList, owner }
        // eslint-disable-next-line no-extra-parens
        const admin: IUser = { id: (args as DtoUser).id }
        await fileListIdAndOwnerSchema.validateAsync(file)
        await userIdSchema.validateAsync(admin)

        const f = new FileC(file)
        const u = new UserC(admin)
        const { condition } = await u.process('verify') as IUser

        if (condition === 'admin') {
          const result = await f.process('downloadAllDocumentsFromList') as ICustomZip

          const date = new Date().getTime()

          res.setHeader(
            'Content-Disposition',
            `attachment; filename="${date}-${result.name}-documents.zip"`
          )

          res.setHeader('Content-Type', 'application/zip')
          res.status(200).send(result.zip)
        } else
          throw new httpErrors.Forbidden(EFF.forbidden3)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
File.route('/file/delete/:id/:list/:owner')
  .patch(
    verifyAccessToken,
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
