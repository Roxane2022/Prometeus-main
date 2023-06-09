import { Request, Response, Router } from 'express'
import { register } from '../services/prometheus.service'

export const router = Router()

router.get('/', async (req: Request, res: Response) => {
  res.set('Content-Type', 'text/plain')
  res.send(await register.metrics())
})