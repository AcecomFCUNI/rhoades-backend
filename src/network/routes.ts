import swaggerUi from 'swagger-ui-express'
import { Application, Response, Request, Router, NextFunction } from 'express'
import docs from '../utils/docs.json'
import { Home, List, User } from '../routes/index'
import { CustomError, ICustomError } from '../custom/error'
import { response } from './response'

const routers = [List, User]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs))
  routers.forEach((router: Router): Application => app.use('/api', router))

  // Handling 404 error
  app.use((req, res, next) => {
    const error = new CustomError('404 - Not Found')
    error.status = 404
    next(error)
  })
  app.use(
    (error: ICustomError, req: Request, res: Response, next: NextFunction) => {
      if (error.status === 404) response(true, error.message, res, error.status)

      next()
    }
  )
}

export { applyRoutes }
