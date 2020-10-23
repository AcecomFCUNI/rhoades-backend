import { Application, Router } from 'express'
import {
  Home,
  User
} from '../routes/index'

const routers = [User]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
