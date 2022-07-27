const express = require('express')
const controller = require('../controllers/task.controllers')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/', controller.addTask)
router.post('/completed', auth, controller.completedTask)
router.post('/find-for-update', controller.findForUpdateTask) 
router.post('/update', auth, controller.updateTask) 

module.exports = router