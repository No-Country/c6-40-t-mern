const express = require('express')
const router = express.Router()

const { createUserController, getUserById, deleteUserById, updateUserById, addFavorite } = require('../controllers/user.controller')

const { checkJwt } = require('../config/auth0.config')
const addUserToAuth0 = require('../middleware/addUserToAuth0')

// router.post('/', checkJwt, addUserToAuth0, createUserController)
router.get('/:id', addUserToAuth0, getUserById)
router.put('/:id', /*checkJwt,*/ addUserToAuth0, updateUserById)
router.delete('/:id', /*checkJwt,*/ addUserToAuth0, deleteUserById)
router.post('/favorites/:id', /*checkJwt,*/ addUserToAuth0, addFavorite)

module.exports = router
