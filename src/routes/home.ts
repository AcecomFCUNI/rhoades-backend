import { Response, Request, Router } from 'express'
import { response } from '../utils/index'

const Home = Router()

Home.route('')
  .get((req: Request, res: Response): void => {
    response(
      false,
      { result: 'Welcome to Rhoades\'s backend!' },
      res,
      200
    )
  })

export { Home }
