import { Router } from 'express'
import { Request } from '../custom/express.request'
import { Response } from '../custom/express.response'
import { User as UserC } from '../controllers/user'
import { response } from '../network/response'
import { DtoUser } from '../dto-interfaces/user.dto'

const User = Router()

User.route('/:code')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { code }, query: { condition, documentType } } = req
    const uc = new UserC({
      documentNumber: code,
      documentType
    } as DtoUser)
    const process = condition === 'student' ? 'verifyStudent' : 'verifyTeacher'

    try {
      const result = await uc.process(process)
      response(false, result as string, res, 200)
    } catch (error) {
      console.log(error)
      response(true, error.message, res, 500)
    }
  })

User.route('/notify')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, query: { condition } } = req
    const uc = new UserC(args)
    const process = condition === 'student' ? 'notifyStudent' : 'notifyTeacher'

    try {
      const result = await uc.process(process)
      response(false, result as string, res, 200)
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

export { User }
