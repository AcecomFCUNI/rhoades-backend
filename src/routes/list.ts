/* eslint-disable no-extra-parens */
import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom/index'
import { response } from '../utils/index'
import { List as ListC } from '../controllers/index'
import { DtoList } from '../dto-interfaces/index'
import { listSchema } from '../schemas/list'

const List = Router()

List.route('/list/createList')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      const list = {
        owner: (args as DtoList).owner,
        type : (args as DtoList).type
      } as DtoList

      try {
        await listSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('createList')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

List.route('/list/getListsOfUser/:id')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { id }, query: { condition } } = req
      const list = {
        owner: id as string
      } as DtoList

      try {
        await listSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('getListsOfUser', condition as string)

        response(false, { result }, res, 200)
      } catch (error) {
        next(error)
      }
    }
  )

export { List }
