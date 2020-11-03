import swaggerUi from 'swagger-ui-express'
import httpErrors from 'http-errors'
import { Application, Response, Request, Router, NextFunction } from 'express'
import docs from '../utils/docs.json'
import { Home, List, User } from '../routes/index'
import { response } from './response'

const routers = [List, User]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs))
  routers.forEach((router: Router): Application => app.use('/api', router))

  // Handling 404 error
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new httpErrors.NotFound('This route does not exist'))
  })
  app.use((
    error: httpErrors.HttpError,
    req  : Request,
    res  : Response,
    next : NextFunction
  ) => {
    if (error.status === 404) response(true, error.message, res, error.status)

    next()
  })
}

export { applyRoutes }
