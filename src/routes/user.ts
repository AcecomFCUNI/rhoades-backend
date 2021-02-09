import { NextFunction, Router } from 'express'
import { CustomNodeJSGlobal, Request, Response } from '../custom'
import { User as UserC } from '../controllers'
import { response, verifyAccessToken } from '../utils'
import { DtoList, DtoUser } from '../dto-interfaces'
import {
  listValidation,
  userCodeSchema,
  userNotifySchema,
  userVerifySchema
} from '../schemas'

declare const global: CustomNodeJSGlobal

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

// Safe route
User.route('/user/notify')
  .patch(
    verifyAccessToken,
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

// Safe route
User.route('/user/enroll/:code')
  .post(
    verifyAccessToken,
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

        await listValidation(global.electionCodes)
          .listFinishRegistrationSchema
          .validateAsync(args as DtoList)

        const uc = new UserC(user)
        const result = await uc.process('enroll', args as DtoList)

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
User.route('/user/setCommitteeMember/:code')
  .post(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { code } } = req
      const user = {
        documentNumber: code
      } as DtoUser

      try {
        await userCodeSchema.validateAsync(user)

        const uc = new UserC(user)
        const result = await uc.process('committeeMember')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { User }
