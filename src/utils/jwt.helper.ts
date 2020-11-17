/* eslint-disable no-extra-parens */
import httpErrors from 'http-errors'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { Request } from '../custom/express.request'

const signAccessToken = (id: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const payload = {
      name: 'Yours truly'
    }
    const secret = process.env.ACCESS_TOKEN_SECRET as string

    const options = {
      audience : id,
      expiresIn: '10m',
      issuer   : process.env.RHOADES_FRONT_URL as string
    }
    jwt.sign(payload, secret, options, (error, token): void => {
      if (error) {
        console.error(error)
        reject(new httpErrors.InternalServerError('Ups! Something went wrong'))
      } else resolve(token)
    })
  })
}

const verifyAccessToken = (
  req : Request,
  res : Response,
  next: NextFunction
): void => {
  const { headers: { authorization } } = req
  if (!authorization) next(new httpErrors.Unauthorized())

  const bearerToken = (authorization as string).split(' ')
  const token = bearerToken[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, payload): void => {
      if (error) {
        console.error(error)

        next(new httpErrors.Unauthorized())
      }
      req.payload = payload

      next()
    }
  )
}

export { signAccessToken, verifyAccessToken }
