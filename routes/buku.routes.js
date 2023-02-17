const { getBuku, getBukuById, searchBuku } = require('../controllers/buku.controllers')
const router = require('express').Router()


router.get('/buku', getBuku)
router.get('/buku/:id', getBukuById)
router.get('/cari/buku', searchBuku)

module.exports = router