import { Request, Response, Router } from 'express'
import { getUsernameHash } from '../services/hashing.service'
import { getHexRGBFromHexHash, getHSLFromHexHash } from '../services/color.service'

export const router = Router()

router.get('/:username', async (req: Request, res: Response) => {
  const username = req.params.username
  const usernameHash = getUsernameHash(username)
  res.send({
    username,
    rgb: getHexRGBFromHexHash(usernameHash),
    hsl: getHSLFromHexHash(usernameHash)
  })
})