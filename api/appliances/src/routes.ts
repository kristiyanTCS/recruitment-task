import express from 'express'
import create from './handlers/create'
import deleteRecord from './handlers/delete'
import findById from './handlers/findById'
import list from './handlers/list'
import reboot from './handlers/reboot'
import update from './handlers/update'

// Middleware
import checkDbHasEntries from './middleware/checkDbHasEntries'
import isAuthenticated from './middleware/isAuthenticated'

// Create router
const router = express.Router()

// Apply middleware
router.use(checkDbHasEntries)
router.use(isAuthenticated)

// Define handlers
router.get('/list/:sortBy/:order', list)
router.get('/:id', findById)
router.post('/create', create)
router.patch('/:id', update)
router.patch('/:id/reboot', reboot)
router.delete('/:id', deleteRecord)

export default router
