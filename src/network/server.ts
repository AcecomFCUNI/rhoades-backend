import express from 'express'
import morgan from 'morgan'
import { applyRoutes } from './routes'
import { firebaseConnection, redisConnection } from '../database/index'

class Server {
  public app                 : express.Application
  private _firebaseConnection: (() => void) | undefined
  private _redisConnection   : (() => void) | undefined

  constructor () {
    this.app = express()
    this._config()
  }

  private _config () {
    this.app.set('port', process.env.PORT as string || '3000')
    this.app.use(morgan('dev'))
    this.app.use(express.json())
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
          'GET, PATCH, POST'
        )
        next()
      }
    )
    applyRoutes(this.app)
  }

  private _firebase (): void {
    this._firebaseConnection = firebaseConnection
    this._firebaseConnection()
  }

  private _redis (): void {
    this._redisConnection = redisConnection
    this._redisConnection()
  }

  public start (): void {
    this.app.listen(this.app.get('port'), () =>
      console.log(`Server running at port ${this.app.get('port')}.`)
    )

    try {
      this._firebase()
      // this._redis()
    } catch (error) {
      console.error(error)
    }
  }
}

const server = new Server()

export { server as Server }
