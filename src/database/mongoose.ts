import mongoose from 'mongoose'

const { connection } = mongoose

const connectionConfig = {
  keepAlive         : true,
  useCreateIndex    : true,
  useFindAndModify  : false,
  useNewUrlParser   : true,
  useUnifiedTopology: true
}

connection.on('connected', () => console.log('Mongo connection established.'))

connection.on('reconnected', () => console.log('Mongo connection reestablished'))

connection.on('disconnected', () => {
  console.log('Mongo connection disconnected')
  console.log('Trying to reconnected to Mongo...')
  setTimeout(() => {
    mongoose.connect(process.env.MONGO_URI as string, {
      ...connection,
      connectTimeoutMS: 3000,
      socketTimeoutMS : 3000
    })
  }, 3000)
})

connection.on('close', () => {
  console.log('Mongo connection closed')
})

connection.on('error', (error: Error) => {
  console.log('Mongo connection error:')
  console.error(error)
})

const mongoConnection = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI as string, connectionConfig)
}

export { mongoConnection }
