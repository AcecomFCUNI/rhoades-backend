/* eslint-disable no-extra-parens */
import { NextFunction, Router } from 'express'
import { CustomNodeJSGlobal, Request, Response } from '../custom'
import { response, verifyAccessToken } from '../utils'
import { List as ListC } from '../controllers'
import { DtoList } from '../dto-interfaces'
import {
  userIdSchema,
  listValidation
} from '../schemas'

declare const global: CustomNodeJSGlobal

const List = Router()

// Safe route
List.route('/list/createList')
  .post(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, query: { faculty } } = req
      const list: DtoList = {
        faculty,
        owner: (args as DtoList).owner,
        type : (args as DtoList).type
      }

      try {
        await listValidation(global.electionCodes)
          .listCreationSchema
          .validateAsync(list)

        const lc = new ListC(list)
        const result = await lc.process('createList')

        response(false, { result }, res, 201)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
List.route('/list/delete')
  .patch(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      const list: DtoList = {
        id   : (args as DtoList).id,
        owner: (args as DtoList).owner
      }

      try {
        await listValidation(global.electionCodes)
          .listFinishRegistrationSchema
          .validateAsync(list)

        const lc = new ListC(list)
        const result = await lc.process('deleteList')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
List.route('/list/getListsOfUser/:id')
  .get(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { params: { id } } = req
      const list: DtoList = {
        owner: id as string
      }

      try {
        await listValidation(global.electionCodes)
          .listOwnerSchema
          .validateAsync(list)

        const lc = new ListC(list)
        const result = await lc.process('getListsOfUser')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Public route
List.route('/list/getListForMalkova')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const list = new ListC({} as DtoList)

      try {
        const result = await list.process('getAcceptedLists')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
List.route('/list/finishRegistration')
  .patch(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req
      const list: DtoList = {
        id   : (args as DtoList).id,
        owner: (args as DtoList).owner
      }

      try {
        await listValidation(global.electionCodes)
          .listFinishRegistrationSchema
          .validateAsync(list)

        const lc = new ListC(list)
        const result = await lc.process('finishRegistration')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
List.route('/list/filter/:adminId')
  .get(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { query: { faculty, type } } = req
      const list: DtoList = {
        faculty,
        type
      }

      try {
        await listValidation(global.electionCodes)
          .listFilterByFacultyAndType
          .validateAsync(list)

        const lc = new ListC(list)
        const result = await lc.process('filter')

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// Safe route
List.route('/list/removeCandidate/:candidateId')
  .patch(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, params: { candidateId } } = req
      const list: DtoList = {
        id   : (args as DtoList).id,
        owner: (args as DtoList).owner
      }

      try {
        await listValidation(global.electionCodes)
          .listFinishRegistrationSchema
          .validateAsync(list)

        const lc = new ListC(list)
        const result = await lc.process('removeCandidate', candidateId)

        response(false, { result }, res, 200)
      } catch (error) {
        if (error.isJoi) error.status = 422
        next(error)
      }
    }
  )

// TODO: Protect this route
List.route('/list/review/:adminId/:status')
  .patch(
    verifyAccessToken,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args }, params: { adminId, status } } = req
      const list: DtoList = {
        id         : (args as DtoList).id,
        observation: (args as DtoList).observation,
        owner      : (args as DtoList).owner,
        status
      }

      try {
        await listValidation(global.electionCodes)
          .listReviewSchema
          .validateAsync(list)

        await userIdSchema.validateAsync({ id: adminId })
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
