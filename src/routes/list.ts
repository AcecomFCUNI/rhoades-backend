/* eslint-disable no-extra-parens */
import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom/index'
import { response } from '../utils/index'
import { List as ListC } from '../controllers/index'
import { DtoList } from '../dto-interfaces/index'
import { listCreationSchema, listOwnerSchema } from '../schemas/index'

const List = Router()

List.route('/list/createList')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req

      try {
        await listCreationSchema.validateAsync(args as DtoList)
        const lc = new ListC(args as DtoList)
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
      const { params: { id } } = req
      const list = {
        owner: id as string
      } as DtoList

      try {
        await listOwnerSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('getListsOfUser')

        response(false, { result }, res, 200)
      } catch (error) {
        next(error)
      }
    }
  )

export { List }
