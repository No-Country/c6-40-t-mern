const express = require('express')
const router = express.Router()
const { requiredScopes } = require('express-oauth2-jwt-bearer')
const { readCategories, createCategory, updateCategory, removeCategory } = require('../controllers/categories.controller')
const categoyValidation = require('../middleware/categoyValidation')
const { checkJwt } = require('../config/auth0.config')


router.get('/', readCategories)

router.post('/', categoyValidation, createCategory)

router.put('/:id', categoyValidation, updateCategory)

router.delete('/:id', removeCategory)



module.exports = router