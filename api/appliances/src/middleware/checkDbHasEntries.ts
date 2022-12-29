import { NextFunction, Request, Response } from 'express'
import db, { populateDb } from '../db/db'

export default (_: Request, __: Response, next: NextFunction) => {
  // If db is empty
  if (!Object.keys(db.JSON()).length) {
    populateDb()
  }

  next()
}
