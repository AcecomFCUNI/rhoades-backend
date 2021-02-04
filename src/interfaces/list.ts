import { IUser } from './user'

export interface IList {
  applicants?   : string[] | IUser[]
  closed?       : boolean
  faculty?      : string
  id            : string
  number?       : number
  observation?  : string
  owner?        : string | IUser
  reviewedTimes?: number
  status?       : string
  type?         : string
}
