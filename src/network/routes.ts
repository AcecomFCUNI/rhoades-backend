import { Application, Router } from 'express'
import {
  Home,
  List,
  User
} from '../routes/index'

const routers = [ List, User ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
