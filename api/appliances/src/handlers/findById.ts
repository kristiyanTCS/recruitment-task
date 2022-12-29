import { Request, Response } from 'express'

import db from '../db/db'
import { Appliance } from '../types/appliance'

export default (req: Request, res: Response) => {
  // Get the desired appliance ID
  let applianceId = req.params.id

  // Check for it in the db
  const appliance: Appliance = db.get(applianceId)

  // If present - return it, else - 404
  return appliance ? res.json(appliance) : res.sendStatus(404)
}
