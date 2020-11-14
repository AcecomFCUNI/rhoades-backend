import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom/index'
import { User as UserC } from '../controllers/index'
import { response } from '../utils/index'
import { DtoList, DtoUser } from '../dto-interfaces/index'
import { userSchema } from '../schemas/user'

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
        await userSchema.validateAsync(user)
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
      const user = {
        id: args?.id as string
      } as DtoUser

      try {
        await userSchema.validateAsync(user)
        const uc = new UserC(user)
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
        query : { condition, documentType }
      } = req
      const user = {
        condition     : condition as string,
        documentNumber: code as string,
        documentType  : documentType as string
      } as DtoUser

      try {
        await userSchema.validateAsync(user)
        const uc = new UserC(user)
        const { id } = args as DtoList
        const result = await uc.process('enroll', id as string)

        response(true, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { User }
