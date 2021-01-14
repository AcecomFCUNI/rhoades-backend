import httpErrors from 'http-errors'

import { EFF } from './file.messages'
import { EFL, MFL } from './list.messages'
import { EMFA } from './service.messages'
import { CFU, EFU, MFU } from './user.messages'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const errorHandling = (error: any, message?: string): never => {
  console.error(error)

  if (error.message.includes('No document to update'))
    throw new httpErrors.NotFound(EFL.missingList)

  if (error instanceof httpErrors.HttpError)
    throw error

  throw new httpErrors.InternalServerError(message ?? error.message)
}

export { CFU, EFF, EFL, EFU, EMFA, MFL, MFU, errorHandling }
