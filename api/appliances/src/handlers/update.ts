import { Request, Response } from 'express'
import { includes, pick, prop } from 'ramda'
import { APPLIANCE_TYPES } from '../constants'

import db from '../db/db'

export default (req: Request, res: Response) => {
  const applianceId = req.params.id

  // Attempt to fetch record
  let appliance = db.get(applianceId)

  // If not found - return
  if (!appliance) return res.sendStatus(404)

  appliance = JSON.parse(appliance)

  const updates = pick(['name', 'type'], req.body)

  if (
    prop('type', updates) &&
    !includes(prop('type', updates), APPLIANCE_TYPES)
  )
    return res.sendStatus(400)

  const updatedAppliance = {
    ...appliance,
    ...updates,
  }

  // Modify DB record
  db.set(applianceId, JSON.stringify(updatedAppliance))

  // Return
  res.json(updatedAppliance)
}
