import { NextFunction, Request, Response, Router } from 'express'
//import { redisClient } from '../services/redis.service'
import { randomUUID } from 'crypto'
//import { getFromCache, addToCache } from '../middleware/caching'
import { pgClient } from '../services/postgres.service'

export const router = Router()

/***
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    description: The user ID
 *                    example: 05a5402b-f6d4-45bb-a587-0275c7725f3e
 *                  name:
 *                    type: string
 *                    description: The user name
 *                    example: Lucas
 */
router.get('/',
  // we try to look up the users in the cache using the middleware
 /*  (req: Request, res: Response, next: NextFunction) => {
    getFromCache('users', res, next)
  }, */
  // if the lookup was unsuccessful, we query the database
  async (req: Request, res: Response) => {
    const queryResult = await pgClient.query('SELECT * FROM users')
    const data = queryResult.rows
    console.log('Cache miss, adding to cache', data)
    //addToCache('users', JSON.stringify(data))
    res.send(data)
  })

/***
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user name
 *                 example: Lucas
 *             required:
 *              - name
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: The user ID
 *                  example: 05a5402b-f6d4-45bb-a587-0275c7725f3e
 *                name:
 *                  type: string
 *                  description: The user name
 *                  example: Lucas
 */
router.post('/', async (req: Request, res: Response) => {
  // validate request body with zod
  const user = {
    id: randomUUID(),
    name: req.body.name
  }
  await pgClient.query('INSERT INTO users (id, name) VALUES ($1, $2)', [user.id, user.name])

  /* const data = await redisClient.get('users')
  let users = data ? JSON.parse(JSON.parse(data)) : []
  users.push(user)
  await addToCache('users', JSON.stringify(users)) */

  res.send(user)
});

/***
 * @swagger
 * /users/{id}:
 *   delete:
 *    description: Delete a user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user ID
 *        example: 05a5402b-f6d4-45bb-a587-0275c7725f3e
 *    responses:
 *      200:
 *        description: The deleted user ID
 *        content:
 *          plain/text:
 *            schema:
 *              type: string
 *            example: 05a5402b-f6d4-45bb-a587-0275c7725f3e
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  await pgClient.query('DELETE FROM users WHERE id = $1', [id])

 /*  const data = await redisClient.get('users')
  let users: { id: string }[] = data ? JSON.parse(JSON.parse(data)) : []
  users = users.filter(user => user.id !== id)
  await addToCache('users', JSON.stringify(users))
 */
  res.send(id)
})