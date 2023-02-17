const router = require('express').Router()
const { authTokenAdmin } = require('../../middleware/authenticate')
const {
    createBuku, getBuku, getBukuById, updateBuku, deleteBuku,
} = require('../../controllers/buku.controllers')
const uploadCover = require('../../middleware/multer-upload')

router.get('/buku', authTokenAdmin, getBuku)
router.get('/buku/:id', authTokenAdmin, getBukuById)
router.post('/buku/upload', authTokenAdmin, uploadCover.single('cover'), createBuku)
router.put('/buku/update', authTokenAdmin, uploadCover.single('cover'), updateBuku)
router.delete('/buku/delete', authTokenAdmin, deleteBuku)

module.exports = router