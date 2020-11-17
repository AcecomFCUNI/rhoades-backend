import httpErrors from 'http-errors'
import jwt from 'jsonwebtoken'

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

export { signAccessToken }
