const { getKembali, createKembali } = require('../../controllers/kembali.controllers')
const { authTokenAdmin } = require('../../middleware/authenticate')

const router = require('express').Router()

router.get('/kembali', authTokenAdmin, getKembali)
router.put('/kembali/:id', authTokenAdmin, createKembali)

module.exports = router