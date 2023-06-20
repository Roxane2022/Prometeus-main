//Route zur Tasks
import { NextFunction, Request, Response, Router } from 'express'
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
/*   (req: Request, res: Response, next: NextFunction) => {
    getFromCache('tasks', res, next)
  }, */
  // if the lookup was unsuccessful, we query the database
  async (req: Request, res: Response) => {
    const queryResult = await pgClient.query('SELECT * FROM tasks')
    const data = queryResult.rows
    console.log('Cache miss, adding to cache', data)
   // addToCache('tasks', JSON.stringify(data))
    res.send(data)
  })
/* 
  router.get('/id',
  // we try to look up the users in the cache using the middleware
   (req: Request, res: Response, next: NextFunction) => {
    getFromCache('tasks', res, next)
  }, 
  // if the lookup was unsuccessful, we query the database
  
  async (req: Request, res: Response) => {
    console.log ("route getid");
    const queryResult = await pgClient.query('SELECT * FROM tasks where id=""')
    const data = queryResult.rows
    console.log('Cache miss, adding to cache', data)
   // addToCache('tasks', JSON.stringify(data))
    res.send(data)
  })
*/


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
  const task = {
    id: randomUUID(),
    name: req.body.name,
    time: req.body.time
  }
  await pgClient.query('INSERT INTO tasks (id, name, time) VALUES ($1, $2, $3)', [task.id, task.name, task.time])

 /*  const data = await redisClient.get('tasks')
  let tasks = data ? JSON.parse(JSON.parse(data)) : []
  tasks.push(task)
  await addToCache('tasks', JSON.stringify(tasks)) */

  res.send(task)
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

  await pgClient.query('DELETE FROM tasks WHERE id = $1', [id])

 /*  const data = await redisClient.get('tasks')
  let tasks: { id: string }[] = data ? JSON.parse(JSON.parse(data)) : []
  tasks = tasks.filter(task => task.id !== id)
  await addToCache('tasks', JSON.stringify(tasks)) */

  res.send(id)
})