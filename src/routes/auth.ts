/* eslint-disable no-extra-parens, max-len */
import { NextFunction, Response, Router } from 'express'
import { Request } from '../custom'
import {
  response,
  signAccessToken,
  verifyAccessToken
} from '../utils'
import { validationSchema } from '../schemas'
import { DtoUser } from '../dto-interfaces'

const Auth = Router()

// TODO: Encrypt responses for the client

// Private route only in local
Auth.route('/auth/test')
  .get(
    verifyAccessToken,
    async (req: Request, res: Response): Promise<void> => {
      const { body: { args }, payload } = req
      res.send({ args, payload })
    }
  )

Auth.route('/auth/login')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      try {
        await validationSchema.validateAsync(args)
        const accessToken = await signAccessToken((args as DtoUser).id as string)

        response(false, { result: { accessToken } }, res, 200 )
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { Auth }
