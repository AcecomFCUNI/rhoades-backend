import { Router } from 'express'
import { Request } from '../custom/express.request'
import { Response } from '../custom/express.response'
import { response } from '../network/response'
import { List as ListC } from '../controllers/list'
import { DtoList } from '../dto-interfaces/list.dto'

const List = Router()

List.route('/list/createList')
  .post(async (req: Request, res: Response) => {
    const { body: { args }, query: { condition } } = req
    const lc = new ListC({
      ...args,
      type: condition
    } as DtoList)

    try {
      const result = await lc.process('createList')
      response(false, result as string, res, 200)
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

List.route('/list/getListsOfUser/:id')
  .get(async (req: Request, res: Response) => {
    const { params: { id } } = req
    const lc = new ListC({
      owner: id as string
    })

    try {
      const result = await lc.process('getListsOfUser')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

export { List }
