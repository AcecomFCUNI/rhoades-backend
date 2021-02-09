import { GeneralDto } from './general.dto'

export interface DtoFile extends GeneralDto {
  data?    : Buffer
  encoding?: string
  list?    : string
  mimetype?: string
  name?    : string
  owner?   : string
  size?    : number
}
