import { Request } from 'express'
import { DtoUser } from '../dto-interfaces/user.dto'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  body: {
    args: DtoUser
  },
  query: {
    condition?   : string,
    documentType?: string
  }
}

export { CustomRequest as Request }
