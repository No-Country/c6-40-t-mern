const express = require('express');
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const { checkJwt } = require('../config/auth0.config');
const router = express.Router();

const { createArticleController, readArticleController, readAllArticlesController, deleteArticleController, updateArticleController } = require('../controllers/article.controller');
const articleValidation = require('../middleware/articleValidation');
const imgHandler = require('../middleware/imgHandler');
const canCreate = requiredScopes('create:publicaciones')
const canEdit = requiredScopes('edit:publicaciones')
const canDelete = requiredScopes('delete:publicaciones')
const isUser = requiredScopes('rol:user')

//"delete:comentarios"

router.post('/', checkJwt, canCreate, imgHandler, articleValidation, createArticleController)
router.get('/all', readAllArticlesController)
router.get('/:id', readArticleController)
router.put('/:id', checkJwt, canDelete, updateArticleController)
router.delete('/:id', checkJwt, canDelete, deleteArticleController)


module.exports = router