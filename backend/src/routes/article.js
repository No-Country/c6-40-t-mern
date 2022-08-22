const express = require('express');
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const { checkJwt } = require('../config/auth0.config');
const router = express.Router();

const { createArticleController, readArticleController, readAllArticlesController, deleteArticleController, updateArticleController } = require('../controllers/article.controller');
const articleValidation = require('../middleware/articleValidation');
const imgHandler = require('../middleware/imgHandler');
const canCreateArticles = requiredScopes('create:publicaciones')
const canEditArticles = requiredScopes('edit:publicaciones')
const canDeleteArticles = requiredScopes('delete:publicaciones')
const canDeleteComments = requiredScopes('delete:comentarios')
const isUser = requiredScopes('rol:user')

router.post('/', checkJwt, canCreateArticles, imgHandler, articleValidation, createArticleController)
router.get('/all', readAllArticlesController)
router.get('/:id', readArticleController)
router.put('/:id', checkJwt, canEditArticles, updateArticleController)
router.delete('/:id', checkJwt, canDeleteArticles, deleteArticleController)


module.exports = router