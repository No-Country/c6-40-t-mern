const express = require('express')
const router = express.Router()
const { requiredScopes } = require('express-oauth2-jwt-bearer')
const { checkJwt } = require('../config/auth0.config')

const { createArticle, readArticle, readAllArticles, deleteArticle, updateArticle } = require('../controllers/article.controller')
// const articleValidation = require('../middleware/articleValidation')
// const imgHandler = require('../middleware/imgHandler')
// const canCreateArticles = requiredScopes('create:publicaciones')
const canEditArticles = requiredScopes('edit:publicaciones')
const canDeleteArticles = requiredScopes('delete:publicaciones')

router.post('/', createArticle)
router.get('/all', readAllArticles)
router.get('/:id', readArticle)
router.put('/:id', checkJwt, canEditArticles, updateArticle)
router.delete('/:id', checkJwt, canDeleteArticles, deleteArticle)

module.exports = router
