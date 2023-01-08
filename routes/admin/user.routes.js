
const router = require('express').Router()
const {authTokenAdmin} = require('../../middleware/authenticate')
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user.controllers')


router.get('/users', authTokenAdmin, getUsers)
router.get('/user/:id', authTokenAdmin, getUserById)
router.post('/users', authTokenAdmin, createUser)
router.put('/user/update/:id', authTokenAdmin, updateUser)
router.delete('/user/delete/:id', authTokenAdmin, deleteUser)

module.exports = router