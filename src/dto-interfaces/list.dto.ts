import { GeneralDto } from './general.dto'

export interface DtoList extends GeneralDto {
  faculty?    : string
  observation?: string
  owner?      : string
  status?     : string
  type?       : string
}
