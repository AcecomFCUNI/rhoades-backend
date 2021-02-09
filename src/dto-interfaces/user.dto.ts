import { GeneralDto } from './general.dto'

export interface DtoUser extends GeneralDto {
  condition?     : string
  documentNumber?: string
  documentType?  : string
  gender?        : string
}
