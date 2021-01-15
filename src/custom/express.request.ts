/* eslint-disable @typescript-eslint/ban-types */
import { Request } from 'express'
import { DtoFile, DtoList, DtoUser } from '../dto-interfaces'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  body: {
    args: DtoFile | DtoList | DtoUser | DtoUser[]
  }
  payload?: object
  query: {
    condition?     : string
    documentNumber?: string
    documentType?  : string
    faculty?       : string
    type?          : string
  }
}

export { CustomRequest as Request }
