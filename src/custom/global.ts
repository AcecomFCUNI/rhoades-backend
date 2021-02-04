import redis from 'redis'
import { Firestore } from '@google-cloud/firestore'
import { DtoProcessesMessage } from '../dto-interfaces'

interface CustomNodeJSGlobal extends NodeJS.Global {
  electionCodes       : string[]
  electionNames       : string[]
  firestoreDB         : Firestore
  listNumber          : number
  redisDB             : redis.RedisClient
  rhoadesProcessesData: DtoProcessesMessage
}

export { CustomNodeJSGlobal }
