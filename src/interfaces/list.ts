import { IUser } from './user'

export interface IList {
  applicants? : string[] | IUser[]
  closed?     : boolean
  faculty?    : string
  id          : string
  observation?: string
  owner?      : string
  status?     : string
  type?       : string
}
