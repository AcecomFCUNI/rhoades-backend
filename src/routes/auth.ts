import { NextFunction, Response, Request, Router } from 'express'
import httpErrors from 'http-errors'
import { response } from '../utils/index'

const Auth = Router()

Auth.route('/refresh-token')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const id = req.body?.args?.id
        if (!id) throw new httpErrors.BadRequest('Missing parameters')

        response(false, { id }, res, 200)
      } catch (error) {
        next(error)
      }
    }
  )

export { Auth }
