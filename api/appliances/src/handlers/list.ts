import { Request, Response } from 'express'
import { sortBy, prop, includes } from 'ramda'

import db from '../db/db'
import { Appliance } from '../types/appliance'

export default (req: Request, res: Response) => {
  const { sortBy: sortingProp, order } = req.params

  // Fetch appliances from DB
  let appliances: Appliance[] = []

  // Parse the records
  for (let key of Object.keys(db.JSON())) {
    appliances.push(JSON.parse(db.JSON()[key]))
  }

  const allowedSortValues = ['type', 'name', 'createdAt', 'id']
  const allowedOrderValues = ['asc', 'desc']

  // Handle sorting
  if (sortingProp) {
    if (
      !includes(sortingProp, allowedSortValues) ||
      !includes(order, allowedOrderValues)
    )
      return res.sendStatus(400)

    const sort = sortBy(prop(sortingProp))

    appliances = sort(appliances)

    if (order === 'desc') appliances = appliances.reverse()
  }

  // Return result
  return res.json(appliances)
}
