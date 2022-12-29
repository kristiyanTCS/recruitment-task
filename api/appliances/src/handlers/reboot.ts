import { Request, Response } from 'express'

import db from '../db/db'

export default (req: Request, res: Response) => {
  const applianceId = req.params.id

  // Attempt to fetch record
  let appliance = db.get(applianceId)

  // If not found - return
  if (!appliance) return res.sendStatus(404)

  appliance = JSON.parse(appliance)

  // "Reboot" appliance
  const updatedAppliance = {
    ...appliance,
    lastRebooted: new Date(),
  }

  // Modify DB record
  db.set(applianceId, JSON.stringify(updatedAppliance))

  // Return
  res.sendStatus(202)
}
