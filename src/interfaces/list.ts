import { IUser } from './user'

export interface IList {
  applicants?: string[] | IUser[]
  closed?    : boolean
  faculty?   : string
  id         : string
  owner?     : string
  type?      : string
}
