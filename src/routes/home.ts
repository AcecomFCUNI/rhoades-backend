import { Response, Request, Router } from 'express'
import { response } from '../utils'
import { CustomNodeJSGlobal } from '../custom'

declare const global: CustomNodeJSGlobal

const Home = Router()

Home.route('')
  .get((req: Request, res: Response): void => {
    response(
      false,
      {
        result: {
          established: global.rhoadesProcessesData.established,
          periods    : global.rhoadesProcessesData.periods
        }
      },
      res,
      200
    )
  })

export { Home }
