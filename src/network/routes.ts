import swaggerUi from 'swagger-ui-express'
import { Application, Router } from 'express'
import docs from '../utils/docs.json'
import {
  Home,
  List,
  User
} from '../routes/index'

const routers = [ List, User ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs))
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
