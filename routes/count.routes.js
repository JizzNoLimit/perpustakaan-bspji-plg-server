const { getCoundData } = require('../controllers/count.controllers')

const router = require('express').Router()

router.get('/total-data', getCoundData)

module.exports = router