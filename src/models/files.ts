import { Document, model, Schema } from 'mongoose'

interface IFile extends Document {
  data    : Buffer
  encoding: string
  list    : string
  mimetype: string
  name    : string
  size    : number
}

const File = new Schema(
  {
    data: {
      required: true,
      type    : Buffer
    },
    encoding: {
      required: true,
      type    : String
    },
    list: {
      required: true,
      type    : String
    },
    mimetype: {
      required: true,
      type    : String
    },
    name: {
      required: true,
      type    : String
    },
    size: {
      required: true,
      type    : Number
    }
  },
  {
    collection: 'files',
    timestamps: {
      createdAt: true
    }
  }
)

const FileModel = model<IFile>('files', File)

export { IFile, FileModel }
