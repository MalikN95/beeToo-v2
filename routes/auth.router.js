const express = require('express')
const controller = require('../controllers/auth.controllers')
const router = express.Router()


router.get('/', controller.auth)
router.get('/logout', controller.logout)
/router.post('/login', controller.login)

module.exports = router