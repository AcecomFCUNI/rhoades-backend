import express from 'express'
import morgan from 'morgan'
import { applyRoutes } from './routes'
import { firebaseConnection } from '../database/firebase'

class Server {
  public app                 : express.Application
  private _firebaseConnection: (() => void) |undefined

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
        res.header('Access-Control-Allow-Origin', '*')
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

  public start (): void {
    this.app.listen(this.app.get('port'), () =>
      console.log(`Server running at port ${this.app.get('port')}.`)
    )

    try {
      this._firebase()
    } catch (error) {
      console.error(error)
    }
  }
}

const server = new Server()

export { server as Server }
