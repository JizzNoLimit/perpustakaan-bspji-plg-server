
const router = require('express').Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user.controllers')


router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/users', createUser)
router.put('/user/update/:id', updateUser)
router.delete('/user/delete/:id', deleteUser)

module.exports = router