import { Request, Response } from 'express'

import db from '../db/db'

export default (req: Request, res: Response) => {
  const applianceId = req.params.id

  // Attempt to fetch record
  const appliance = db.get(applianceId)

  // If not found - return
  if (!appliance) return res.sendStatus(404)

  // Else - delete record
  db.delete(applianceId)

  return res.sendStatus(204)
}
