import { Request, Response, Router } from 'express'

export const router = Router()

/***
 * @swagger
 * /colors/{username}:
 *   get:
 *     description: Get color for a user
 *     parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *        description: The username
 *        example: steven
 *     responses:
 *       200:
 *         description: Color for a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username
 *                   example: steven
 *                 rgb:
 *                   type: string
 *                   description: a rgb value
 *                   example: "#c7c084"
 *                 hsl:
 *                   type: object
 *                   description: a hsl value
 *                   properties:
 *                    hue:
 *                     type: number
 *                     description: a hue value
 *                     example: 54
 *                    saturation:
 *                     type: number
 *                     description: a saturation value
 *                     example: 0.37430167597765357
 *                    lightness:
 *                     type: number
 *                     description: a lightness value
 *                     example: 0.6490196078431373
 */
router.get('/:username', async (req: Request, res: Response) => {
  const username = req.params.username
  const result = await (await fetch(`http://node-backend-microservice:3000/${username}`)).json()
  res.send(result)
})
router.get('/:task', async (req: Request, res: Response) => {
  const task = req.params.task
  const result = await (await fetch(`http://node-backend-microservice:3000/${task}`)).json()
  res.send(result)
})