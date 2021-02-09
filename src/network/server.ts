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
import { DtoElectionTypes, DtoList, DtoProcesses } from '../dto-interfaces'
import { IList } from '../interfaces'

declare const global: CustomNodeJSGlobal

class Server {
  public app                 : express.Application
  private _firebaseConnection: (() => (Promise<void>)) | undefined
  private _mongooseConnection: (() => (Promise<void>)) | undefined
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
        if (process.env.MODE === 'dev' || process.env.MODE === 'local')
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

  private async _firebase (): Promise<void> {
    this._firebaseConnection = firebaseConnection
    await this._firebaseConnection()
  }

  private async _mongo (): Promise<void> {
    this._mongooseConnection = mongoConnection
    await this._mongooseConnection()
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

  // eslint-disable-next-line class-methods-use-this
  private async _getElectionTypes (): Promise<void> {
    const response = await axios.get(process.env.ALBAN_TYPE_ELECTIONS as string)

    // eslint-disable-next-line prefer-destructuring
    const data: DtoElectionTypes = response.data

    global.electionCodes = data.message
      .filter(electionType => electionType.active)
      .map(electionType => electionType.name)

    global.electionNames = data.message
      .filter(electionType => electionType.active)
      .map(electionType => electionType.description)

    if (global.electionCodes.length === 0) {
      const id = setInterval(async () => {
        await this._getElectionTypes()

        if (global.electionCodes.length !== 0)
          clearInterval(id)
      }, 5*60*1000)
    }
  }

  public async start (): Promise<void> {
    try {
      await Promise.all([
        this._getSchedule(),
        this._getElectionTypes(),
        this._firebase(),
        this._mongo()
      ])

      setTimeout(async () => {
        await this._getAcceptedList()

        this.app.listen(this.app.get('port'), () => {
          console.log(`Server running at port ${this.app.get('port')}.`)
        })
      }, 7500)
    } catch (error) {
      console.error(error)
    }
  }
}

const server = new Server()

export { server as Server }
