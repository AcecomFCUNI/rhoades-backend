import axios from 'axios'
import express from 'express'
import morgan from 'morgan'
import upload from 'express-fileupload'
import { applyRoutes } from './routes'
import {
  firebaseConnection,
  mongoConnection,
  redisConnection
} from '../database'
import { CustomNodeJSGlobal } from '../custom'
import { List } from '../controllers'
import { DtoList, DtoProcesses } from '../dto-interfaces'
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
      const acceptedLists = await list.process('getAcceptedLists') as IList[]

      if (acceptedLists.length > 0)
        global.listNumber = acceptedLists.length
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

  // eslint-disable-next-line class-methods-use-this
  private async _getSchedule (): Promise<void> {
    const response = await axios.get(process.env.ALBAN_PROCESSES as string)

    // eslint-disable-next-line prefer-destructuring
    const data: DtoProcesses = response.data

    // eslint-disable-next-line prefer-destructuring
    global.rhoadesProcessesData = data.message
      .filter(p => p.name === 'rhoades')[0]

    if (!global.rhoadesProcessesData.established) {
      const id = setInterval(async () => {
        await this._getSchedule()

        if (global.rhoadesProcessesData.established)
          clearInterval(id)
      }, 5*60*1000)
    }
  }

  public start (): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server running at port ${this.app.get('port')}.`)
      try {
        this._firebase()
        this._mongo()
        this._getSchedule()
        // this._redis()
        setTimeout(() => this._getAcceptedList(), 7500)
      } catch (error) {
        console.error(error)
      }
    })
  }
}

const server = new Server()

export { server as Server }
