/* eslint-disable no-extra-parens, max-len */
import httpErrors from 'http-errors'
import joi from 'joi'
import { NextFunction, Response, Router } from 'express'
import { Request } from '../custom/index'
import {
  response,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} from '../utils/index'
import { DtoUser } from '../dto-interfaces'

const validationSchema = joi.object({
  id: joi.string().required()
})
const Auth = Router()

// TODO: Encrypt responses for the client

Auth.route('/test')
  .get(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { headers: { authorization } } = req
      console.log(authorization)
      res.send('Hello world')
    }
  )

Auth.route('/register')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      try {
        await validationSchema.validateAsync(args)
        const accessToken = await signAccessToken((args as DtoUser).id as string)
        const refreshToken = await signRefreshToken((args as DtoUser).id as string)

        response(false, { result: { accessToken, refreshToken } }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

Auth.route('/login')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      try {
        await validationSchema.validateAsync(args)
        const accessToken = await signAccessToken((args as DtoUser).id as string)
        const refreshToken = await signRefreshToken((args as DtoUser).id as string)

        response(false, { result: { accessToken, refreshToken } }, res, 200 )
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

Auth.route('/refresh-token')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args: { refreshToken } } } = req
      try {
        if (!refreshToken) throw new httpErrors.BadRequest()

        const userId = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userId as string)
        const newRefreshToken = await signRefreshToken(userId as string)

        response(false, { result: { accessToken, newRefreshToken } }, res, 200 )
      } catch (error) {
        next(error)
      }
    }
  )

export { Auth }
