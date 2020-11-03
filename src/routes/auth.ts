import { NextFunction, Response, Request, Router } from 'express'
import { response } from '../network/response'

const Auth = Router()

Auth.route('/refresh-token')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    response(false, { success: true }, res, 200)
  })

export { Auth }
