import redis from 'redis'
import { CustomNodeJSGlobal } from '../custom/global'

declare const global: CustomNodeJSGlobal

const redisConnection = (): void => {
  if (process.env.REDIS_LOCAL === 'true')
    global.redisDB = redis.createClient()
  else
    global.redisDB = redis.createClient({
      url: process.env.REDIS_URL as string
    })

  global.redisDB.on('connect', () => {
    console.log('Redis connection established')
  })

  global.redisDB.on('error', error => {
    console.log('There was an error')
    console.error(error)
  })

  global.redisDB.on('end', () => {
    console.log('Redis client disconnect')
  })
}

export { redisConnection }
