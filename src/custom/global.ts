import redis from 'redis'
import { Firestore } from '@google-cloud/firestore'

interface CustomNodeJSGlobal extends NodeJS.Global {
  firestoreDB: Firestore
  redisDB    : redis.RedisClient
}

export { CustomNodeJSGlobal }
