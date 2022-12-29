import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  // Get the cookies from the request
  const cookies = req.headers.cookie?.split(';')?.map((pair) => {
    const splitter = '======='

    const parts = pair.trim().replace('=', splitter).split(splitter)
    const key = parts[0]
    const value = parts[1]

    let res: any = {}

    res[key] = value

    return res
  })

  // Check for the existance of a session cookie
  // In a Real-World-Senario this would be checked additionally against
  // the db
  if (cookies?.find((cookie) => cookie?.session && cookie?.session))
    // If it's found - continue the request handling
    return next()

  // If not - deny access;
  return res.sendStatus(401)
}
