import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom/index'
import { response } from '../network/index'
import { List as ListC } from '../controllers/index'
import { DtoList } from '../dto-interfaces/index'

const List = Router()

List.route('/list/createList')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, query: { condition } } = req
      const lc = new ListC({
        ...args,
        type: condition
      } as DtoList)

      try {
        const result = await lc.process('createList')
        response(false, { result }, res, 200)
      } catch (error) {
        next(error)
      }
    }
  )

List.route('/list/getListsOfUser/:id')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { id } } = req
      const lc = new ListC({
        owner: id as string
      })

      try {
        const result = await lc.process('getListsOfUser')
        response(false, { result }, res, 200)
      } catch (error) {
        next(error)
      }
    }
  )

export { List }
