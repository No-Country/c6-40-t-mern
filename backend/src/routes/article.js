const express = require('express')
const router = express.Router()

const { createArticleController, readArticleController, readAllArticlesController, deleteArticleController } = require('../controllers/article.controller')
const articleValidation = require('../middleware/articleValidation')
const imgHandler = require('../middleware/imgHandler')

router.post('/', imgHandler, articleValidation, createArticleController)
router.get('/all', readAllArticlesController)
router.get('/:id', readArticleController)
router.delete('/:id', deleteArticleController)

module.exports = router
