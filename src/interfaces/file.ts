import { Document } from 'mongoose'

interface IFile extends Document {
  createdAt?: Date
  data      : Buffer
  encoding  : string
  list      : string
  mimetype  : string
  name      : string
  size      : number
  updatedAt?: Date
}

export { IFile }
