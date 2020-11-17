/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, no-extra-parens */
import httpErrors from 'http-errors'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { Request } from '../custom/express.request'

const signAccessToken = (id: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const payload = {}
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

const signRefreshToken = (id: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = process.env.REFRESH_TOKEN_SECRET as string

    const options = {
      audience : id,
      expiresIn: '1d',
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
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    headers: { authorization }
  } = req
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
      req.payload = payload
      next()
    }
  )
}

const verifyRefreshToken = (refreshToken: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (error, payload) => {
        if (error) reject(new httpErrors.Unauthorized())
        const userId = (payload as any).aud

        resolve(userId)
      }
    )
  })
}

export {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
}
