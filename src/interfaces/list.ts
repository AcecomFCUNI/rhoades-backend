import { IUser } from './user'

export interface IList {
  applicants?: string[] | IUser[]
  id         : string
  owner?     : string
  type?      : string
}
