const express = require('express');
const router = express.Router();

const createUserController = require('./../controllers/user.controller')

router.get('/', (req, res) => {
  res.send("hola");
})

router.post('/user', createUserController.createUserController)

module.exports = router;