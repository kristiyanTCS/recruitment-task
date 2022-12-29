import crypto from 'crypto'
import JSONdb from 'simple-json-db'
import { APPLIANCE_TYPES } from '../constants'
import { Appliance } from '../types/appliance'

const db = new JSONdb('./storage.json')

export default db

export const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export const populateDb = () => {}

for (let i = 0; i < 100; i++) {
  const appliance: Appliance = {
    id: i,
    name: `Appliance ${crypto.randomBytes(2).toString('hex')}`,
    type: APPLIANCE_TYPES[Math.floor(Math.random() * APPLIANCE_TYPES.length)],
    createdAt: randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30)),
  }

  db.set(appliance.id.toString(), JSON.stringify(appliance))
}
