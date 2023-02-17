const { getUserRealation, getDataUser } = require('../../controllers/user.controllers')
const { authTokenUser } = require('../../middleware/authenticate')

const router = require('express').Router()

router.get('/data/:id', getDataUser)

module.exports = router