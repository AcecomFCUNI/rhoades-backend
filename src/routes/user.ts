import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom/index'
import { User as UserC } from '../controllers/index'
import { response } from '../utils/index'
import { DtoList, DtoUser } from '../dto-interfaces/index'
import {
  listIdSchema,
  userNotifySchema,
  userVerifySchema
} from '../schemas/index'

const User = Router()

User.route('/user/verify/:code')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { code }, query: { documentType } } = req
      const user = {
        documentNumber: code,
        documentType
      } as DtoUser

      try {
        await userVerifySchema.validateAsync(user)
        const uc = new UserC(user)
        const result = await uc.process('verify')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

User.route('/user/notify')
  .patch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req

      try {
        await userNotifySchema.validateAsync(args as DtoUser)
        const uc = new UserC(args as DtoUser)
        const result = await uc.process('notify')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

User.route('/user/enroll/:code')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const {
        body  : { args },
        params: { code },
        query : { documentType }
      } = req
      const user = {
        documentNumber: code as string,
        documentType  : documentType as string
      } as DtoUser

      try {
        await userVerifySchema.validateAsync(user)
        await listIdSchema.validateAsync(args as DtoList)

        const uc = new UserC(user)
        const result = await uc.process('enroll', args as DtoList)

        response(true, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { User }
