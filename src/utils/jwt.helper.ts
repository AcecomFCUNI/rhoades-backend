/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, no-extra-parens, @typescript-eslint/no-unused-expressions */
import httpErrors from 'http-errors'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { Request } from '../custom/express.request'
import { DtoList } from '../dto-interfaces'

// const MODE = process.env.MODE as string
const ALBAN_ID = process.env.ALBAN_ID as string

interface IPayload {
  aud: string,
  exp: Date,
  iat: Date,
  iss: string
}

const signAccessToken = (id: string): Promise<unknown> => (
  new Promise((resolve, reject) => {
    const secret = process.env.ACCESS_TOKEN_SECRET as string
    const options = {
      audience : id,
      expiresIn: '10m',
      issuer   : process.env.RHOADES_FRONT_URL as string
    }

    jwt.sign({}, secret, options, (error, token): void => {
      if (error) {
        console.error(error)
        reject(new httpErrors.InternalServerError('Ups! Something went wrong'))
      } else resolve(token)
    })
  })
)

const validateRoute = (
  payload: IPayload,
  url    : string,
  next   : NextFunction,
  req    : Request
): void => {
  const { body: { args }, params: { adminId, id, owner } } = req

  // TODO: validate from where the request is coming from using the issuer
  if (url.includes('notify'))
    args.id === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('enroll'))
    (args as DtoList).owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('setCommitteeMember'))
    (args.id === payload.aud && payload.aud === ALBAN_ID)
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('createList'))
    (args as DtoList).owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('getListsOfUser'))
    id === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('finishRegistration'))
    (args as DtoList).owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('filter'))
    adminId === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('removeCandidate'))
    (args as DtoList).owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('list/delete'))
    (args as DtoList).owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('review'))
    adminId === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('upload'))
    owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('getData'))
    owner === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('download'))
    id === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('downloadAllDocumentsFromList'))
    args.id === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('file/delete'))
    id === payload.aud
      ? next()
      : next(new httpErrors.Forbidden())
  else if (url.includes('test'))
    next()
  else
    next(new httpErrors.NotFound())
}

const verifyAccessToken = (
  req : Request,
  res : Response,
  next: NextFunction
): void => {
  const { headers, url } = req
  const { authorization } = headers

  console.log(headers.host)

  if (!authorization) next(new httpErrors.Unauthorized())

  const bearerToken = (authorization as string).split(' ')
  const token = bearerToken[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, payload): void => {
      if (error) {
        console.error(error)
        next(new httpErrors.Unauthorized(error.name === 'JsonWebTokenError' ? undefined : error.message))
      }

      validateRoute((payload as IPayload), url, next, req)
    }
  )
}

export {
  signAccessToken,
  verifyAccessToken
}
