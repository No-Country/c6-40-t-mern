const { validateCategory } = require('../models/categories')

module.exports = (req, res, next) => {
  const { error } = validateCategory(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  else next()
}
