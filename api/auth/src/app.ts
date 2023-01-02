import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import cookieSession from 'cookie-session'
import { includes } from 'ramda'

const app = express()

const domainWhitelist = [
  'http://localhost:3000',
  'http://localhost:4000',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8080/',
]

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
        methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Cookie',
          'Set-Cookie',
        ],
        credentials: true,
      })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
)

app.post('/auth/signin', (req: Request, res: Response) => {
  const user = {
    id: 'abc123',
    email: 'test@vocovo.com',
  }

  const userJwt = jwt.sign(user, 'Jm27CvRnQjxdYsD.Wvuq')

  req.session = {
    jwt: userJwt,
  }

  res.json(user)
})

app.get('/auth/ping', (req, res) => {
  return res.json({ message: 'auth pong' })
})

export default app
