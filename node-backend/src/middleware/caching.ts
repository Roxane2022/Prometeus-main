import { Response, NextFunction } from 'express';
//import { redisClient } from '../services/redis.service';
/* 
export const getFromCache = async (key: string, res: Response, next: NextFunction) => {
  const data = await redisClient.get(key)

  if (data) {
    console.log('Cache hit', data)
    res.status(200).send(JSON.parse(data))
  } else {
    console.log('Cache miss')
    next()
  }
}

export const addToCache = (key: string, data: any) => {
  return redisClient.set(key, JSON.stringify(data))
} */