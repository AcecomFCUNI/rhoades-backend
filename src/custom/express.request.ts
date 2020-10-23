import { Request } from 'express'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  // body: {
  //   args: DtoTasks | DtoProjects | DtoJobOffers
  // },
  query: {
    condition?   : string,
    documentType?: string
  }
}

export { CustomRequest as Request }
