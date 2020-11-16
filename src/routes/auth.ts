/* eslint-disable no-extra-parens */
// import httpErrors from 'http-errors'
import joi from 'joi'
import { NextFunction, Response, Router } from 'express'
import { Request } from '../custom/express.request'
import { response, signAccessToken } from '../utils/index'
import { DtoUser } from '../dto-interfaces'

const validationSchema = joi.object({
  args: joi.object({
    id: joi.string().required()
  })
})
const Auth = Router()

Auth.route('/refresh-token')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: args } = req
      try {
        await validationSchema.validateAsync(args)
        // eslint-disable-next-line max-len
        const accessToken = await signAccessToken((args as DtoUser).id as string)

        response(false, { result: accessToken }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { Auth }
