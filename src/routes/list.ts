/* eslint-disable no-extra-parens */
import { NextFunction, Router } from 'express'
import { Request, Response } from '../custom'
import { response } from '../utils'
import { List as ListC } from '../controllers'
import { DtoList } from '../dto-interfaces'
import {
  userIdSchema,
  listCreationSchema,
  listFilterByFacultyAndType,
  listFinishRegistrationSchema,
  listOwnerSchema,
  listReviewSchema
} from '../schemas'

const List = Router()

List.route('/list/createList')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, query: { faculty } } = req
      const list = {
        faculty,
        owner: (args as DtoList).owner,
        type : (args as DtoList).type
      } as DtoList

      try {
        await listCreationSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('createList')

        response(false, { result }, res, 201)
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
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

List.route('/list/finishRegistration')
  .patch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      const list = {
        id   : (args as DtoList).id,
        owner: (args as DtoList).owner
      } as DtoList

      try {
        await listFinishRegistrationSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('finishRegistration')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

List.route('/list/filter')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { query: { faculty, type } } = req
      const list = {
        faculty,
        type
      } as DtoList

      try {
        await listFilterByFacultyAndType.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('filter')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

List.route('/list/removeCandidate/:candidateId')
  .delete(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, params: { candidateId } } = req
      const list = {
        id   : (args as DtoList).id,
        owner: (args as DtoList).owner
      } as DtoList

      try {
        await listFinishRegistrationSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('removeCandidate', candidateId)

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

List.route('/list/delete')
  .delete(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      const list = {
        id   : (args as DtoList).id,
        owner: (args as DtoList).owner
      } as DtoList

      try {
        await listFinishRegistrationSchema.validateAsync(list)
        const lc = new ListC(list)
        const result = await lc.process('deleteList')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

List.route('/list/review/:adminId/:status')
  .patch(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, params: { adminId, status } } = req
      const list = {
        id         : (args as DtoList).id,
        observation: (args as DtoList).observation,
        owner      : (args as DtoList).owner,
        status
      } as DtoList

      try {
        await listReviewSchema.validateAsync(list)
        await userIdSchema.validateAsync(adminId)
        const lc = new ListC(list)
        const result = await lc.process('review', undefined, adminId)

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

export { List }
