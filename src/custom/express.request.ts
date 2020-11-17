/* eslint-disable @typescript-eslint/ban-types */
import { Request } from 'express'
import { DtoList } from '../dto-interfaces/list.dto'
import { DtoUser } from '../dto-interfaces/user.dto'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  body: {
    args: DtoUser | DtoList
  },
  payload?: object,
  query: {
    condition?     : string,
    documentNumber?: string,
    documentType?  : string
  }
}

export { CustomRequest as Request }
