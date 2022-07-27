const express = require('express')
const controller = require('../controllers/home.controllers')
const router = express.Router()

router.get('/', controller.homePage)
router.get('/:sort', controller.homePage)

module.exports = router