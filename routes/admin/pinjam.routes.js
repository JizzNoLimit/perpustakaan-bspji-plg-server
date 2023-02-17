const router = require('express').Router()
const {
    createPinjam, getPinjam, getPinjamById, updatePinjam, deletePinjam 
} = require('../../controllers/pinjam.controllers')
const { authTokenAdmin } = require('../../middleware/authenticate')


router.get('/pinjam', authTokenAdmin, getPinjam)
router.get('/pinjam/:id', authTokenAdmin, getPinjamById)
router.post('/pinjam', authTokenAdmin, createPinjam)
router.delete('/pinjam/delete', authTokenAdmin, deletePinjam)

module.exports = router