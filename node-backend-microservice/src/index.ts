import express, { Application, Express } from 'express';
import bodyParser from 'body-parser';

import { router as colorRouter } from './routes/usercolor.route'

const app: Express = express();
const port = process.env.PORT || 3000 // TODO: set port via env var

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', colorRouter)

let server: ReturnType<Application["listen"]>

async function startServer() {
  server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
}

startServer()

export default server