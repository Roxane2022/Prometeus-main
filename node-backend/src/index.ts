import express, { Application, Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import { router as metricsRouter } from './routes/metrics.route'
import { router as usersRouter } from './routes/users.route'
import { router as colorRouter } from './routes/apigateway.route'

import { initPg, resetDashboard, resetPg } from './services/postgres.service';
//import { initRedis, resetRedis } from './services/redis.service';
import { router as loginRouter } from './routes/login.route'
import { router as taskRouter } from './routes/tasks.route'
const app: Express = express();
const port = process.env.PORT || 3000 // TODO: set port via env var

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/***
 * @swagger
 * /:
 *   get:
 *     description: Test endpoint
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/', (req: Request, res: Response) => {
  const welcomeMessageHTML = `
  <h1>Welcome to the Node.js backend</h1>
  <p>Try the following endpoints:</p>
  <ul>
    <li><a href="/users">GET /users</a></li>
    <li><a href="/metrics">GET /metrics</a></li>
    <li>and many more...</li>
  </ul>
  <p>You can also check out the <a href="/api-docs">Swagger UI</a></p>
  `
  res.send(welcomeMessageHTML);
});

/***
 * @swagger
 * /reset:
 *   get:
 *     description: Reset Redis DB and add users
 *     responses:
 *       200:
 *         description: Success
 */

app.get('/reset', async (req: Request, res: Response) => {
 // await resetRedis()
  await resetPg()
  await resetDashboard()
  res.send('Redis flushed, DB flushed and users added')
})
app.get('/resettasks', async (req: Request, res: Response) => {

  await resetDashboard()
  res.send('Redis flushed, DB flushed and taskss added')
})

app.use('/users', usersRouter)
app.use('/metrics', metricsRouter)
app.use('/colors', colorRouter)
app.use('/login', loginRouter)
app.use('/tasks', taskRouter)

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test App with Swagger",
      version: "0.1.0",
      description:
        "This is our API application made with Express and documented with Swagger",
    },
    // servers: [
    //   {
    //     url: "http://localhost:3000",
    //   },
    // ],
  },
  apis: ["./dist/*.js", "./dist/routes/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true
  })
);

let server: ReturnType<Application["listen"]>

async function startServer() {

  await initPg()
  //await initRedis()
  await resetDashboard()

  server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
}

startServer()

export default server