import { Request, Response } from 'express'
import { Appliance } from '../types/appliance'

import db, { randomDate } from '../db/db'

export default (req: Request, res: Response) => {
  // Take inputs from body
  const { type, name } = req.body

  // Check inputs (could add more validation but no time now)
  if (!type || !name) return res.sendStatus(400)

  // Create the ID and creation date
  const id = Object.keys(db.JSON()).length
  const createdAt = randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30))

  // Create the record
  const newAppliance: Appliance = {
    id,
    type,
    name,
    createdAt,
  }

  db.set(id.toString(), JSON.stringify(newAppliance))

  // Return success
  res.json(newAppliance)
}
