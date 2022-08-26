const express = require('express')
const router = express.Router()

const { createUserController, getUserById, deleteUserById, updateUserById, addFavorite } = require('../controllers/user.controller')

const { checkJwt } = require('../config/auth0.config')

router.post('/', checkJwt, createUserController)
router.get('/:id', getUserById)
router.put('/:id', checkJwt, updateUserById)
router.delete('/:id', checkJwt, deleteUserById)
router.post('/favorites/:id', checkJwt, addFavorite)

module.exports = router
