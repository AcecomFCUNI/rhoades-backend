import express from 'express'
import upload from 'express-fileupload'
import morgan from 'morgan'
import { applyRoutes } from './routes'
import {
  firebaseConnection,
  mongoConnection,
  redisConnection
} from '../database'
import { CustomNodeJSGlobal } from '../custom'
import { List } from '../controllers'
import { DtoList } from '../dto-interfaces'
import { IList } from '../interfaces'

declare const global: CustomNodeJSGlobal

class Server {
  public app                 : express.Application
  private _firebaseConnection: (() => void) | undefined
  private _mongooseConnection: (() => void) | undefined
  private _redisConnection   : (() => void) | undefined

  constructor () {
    this.app = express()
    this._config()
  }

  private _config () {
    this.app.set('port', process.env.PORT as string || '3000')
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(upload())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        if (process.env.MODE === 'dev')
          res.header('Access-Control-Allow-Origin', '*')
        else
          res.header(
            'Access-Control-Allow-Origin',
            process.env.RHOADES_FRONT_URL as string
          )

        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )

        res.header(
          'Access-Control-Allow-Methods',
          'GET, PATCH, POST, DELETE'
        )
        next()
      }
    )
    applyRoutes(this.app)
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAcceptedList (): Promise<void> {
    const list = new List({} as DtoList)
    try {
      const numberOfAcceptedLists = await list.process('getAcceptedLists') as IList[]

      if (numberOfAcceptedLists.length > 0)
        global.listNumber = numberOfAcceptedLists.length
      else
        global.listNumber = 0

    } catch (error) {
      console.error(error)
      global.listNumber = 0
    }
  }

  private _firebase (): void {
    this._firebaseConnection = firebaseConnection
    this._firebaseConnection()
  }

  private _mongo (): void {
    this._mongooseConnection = mongoConnection
    this._mongooseConnection()
  }

  private _redis (): void {
    this._redisConnection = redisConnection
    this._redisConnection()
  }

  public start (): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server running at port ${this.app.get('port')}.`)
      try {
        Promise.all([
          this._firebase(),
          this._mongo()
          // this._redis()
        ])
        setTimeout(() => this._getAcceptedList(), 3000)
      } catch (error) {
        console.error(error)
      }
    })

  }
}

const server = new Server()

export { server as Server }
