import { Document } from 'mongoose'

interface IFile extends Document {
  data    : Buffer
  encoding: string
  list    : string
  mimetype: string
  name    : string
  size    : number
}

export { IFile }
