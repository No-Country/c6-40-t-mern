const express = require('express')
const router = express.Router()
const { requiredScopes } = require('express-oauth2-jwt-bearer')
const { checkJwt } = require('../config/auth0.config')

const { createArticle, readArticle, readAllArticles, deleteArticle, updateArticle, readArticlesByCategory } = require('../controllers/article.controller')
const articleValidation = require('../middleware/articleValidation')
const imgHandler = require('../middleware/imgHandler')
const canCreateArticles = requiredScopes('create:publicaciones')
// const canEditArticles = requiredScopes('edit:publicaciones')
const canDeleteArticles = requiredScopes('delete:publicaciones')
<<<<<<< HEAD
const canDeleteComments = requiredScopes('delete:comentarios')
const isUser = requiredScopes('rol:user')

router.post('/', createArticle, articleValidation, imgHandler, canCreateArticles, canDeleteArticles, isUser, canDeleteComments)
=======

router.post('/', checkJwt, canCreateArticles, imgHandler, articleValidation, createArticle)
>>>>>>> 83eee4e2d5690af6c66300c35c900edf0b243336
router.get('/all', readAllArticles)
router.get('/category/:category', readArticlesByCategory)
router.get('/:id', readArticle)
router.put('/:id', checkJwt, canCreateArticles, imgHandler, articleValidation, updateArticle)
router.delete('/:id', checkJwt, canDeleteArticles, deleteArticle)

module.exports = router
