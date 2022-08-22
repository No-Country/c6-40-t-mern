const express = require('express')
const router = express.Router()

const { createUserController, getUserById, deleteUserById, updateUserById } = require('../controllers/user.controller')

router.post('/', createUserController)
router.get('/:id', getUserById)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)

module.exports = router
