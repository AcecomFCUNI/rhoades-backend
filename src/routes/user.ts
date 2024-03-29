import { Router } from 'express'
import { Request } from '../custom/express.request'
import { Response } from '../custom/express.response'
import { User as UserC } from '../controllers/user'
import { response } from '../network/response'
import { DtoUser } from '../dto-interfaces/user.dto'
import { DtoList } from '../dto-interfaces/list.dto'

const User = Router()

User.route('/user/verify/:code')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { code }, query: { condition, documentType } } = req
    const uc = new UserC({
      documentNumber: code,
      documentType
    } as DtoUser)

    try {
      const result = await uc.process('verify', condition)
      response(false, { result }, res, 200)
    } catch (error) {
      console.log(error)
      response(true, { result: error.message }, res, 500)
    }
  })

User.route('/user/notify')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args } } = req
    const uc = new UserC(args as DtoUser)

    try {
      const result = await uc.process('notify')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { result: error.message }, res, 500)
    }
  })

User.route('/user/enroll/:code')
  .post(async (req: Request, res: Response) => {
    const {
      body  : { args },
      params: { code },
      query : { condition, documentType }
    } = req
    const uc = new UserC({
      documentNumber: code as string,
      documentType  : documentType as string
    } as DtoUser)
    const { id } = args as DtoList
    const process = condition === 'teacher' ? 'enrollTeacher' : 'enrollStudent'

    try {
      const result = await uc.process(process, undefined, id as string)
      response(true, { result }, res, 200)
    } catch (error) {
      response(true, { result: error.message }, res, 500)
    }
  })

export { User }
