const express = require('express')
const router = express.Router()

const { readCommentsOfArticleById, createComment, deleteCommentById } = require('../controllers/comment.controllers')

// const { checkJwt } = require('../config/auth0.config')
// const { requiredScopes } = require('express-oauth2-jwt-bearer')
// const canDeleteComments = requiredScopes('delete:comentarios')
// const isUser = requiredScopes('rol:user')

router.post('/', createComment)

router.get('/:idArticle', readCommentsOfArticleById)

router.delete('/:id', deleteCommentById)

module.exports = router
