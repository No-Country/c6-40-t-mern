const express = require('express');
const router = express.Router();

const { createArticleController } = require('../controllers/article.controller');
const articleValidation = require('../middleware/articleValidation');
const imgHandler = require('../middleware/imgHandler');
const createUserController = require('./../controllers/user.controller')

router.get('/', (req, res) => {
  res.send("hola");
})

router.post('/user', createUserController.createUserController)
router.post('/article', articleValidation, imgHandler, createArticleController)

module.exports = router;