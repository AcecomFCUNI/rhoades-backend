import { IUser } from './user'

export interface IList {
  applicants?: string[] | IUser[]
  closed?    : boolean
  id         : string
  owner?     : string
  type?      : string
}
