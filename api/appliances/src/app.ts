import express, { Request, Response } from 'express'
import cors from 'cors'

import routes from './routes'
import { includes } from 'ramda'

const app = express()

const domainWhitelist = ['http://localhost:3000', 'http://localhost:8080']

app.use(
  process.env.NODE_ENV === 'test'
    ? cors()
    : cors({
        origin: (origin, callback) => {
          if (includes(origin, domainWhitelist)) {
            callback(null, true)
          } else {
            callback(new Error())
          }
        },
        credentials: true,
      })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/appliances/ping', (_: Request, res: Response) => {
  return res.json({ message: 'appliances pong' })
})

app.use('/appliances', routes)

export default app
