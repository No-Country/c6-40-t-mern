const { validateArticle } = require('../models/articles')

module.exports = (req, res, next) => {
  req.body.tags = req.body.tags.split(',')

  const { error } = validateArticle(req.body)

  if (error) return res.status(400).send(error)
  if (req.method === 'POST' && !req.file) return res.status(400).send('You must send an image with the article')
  else next()
}
