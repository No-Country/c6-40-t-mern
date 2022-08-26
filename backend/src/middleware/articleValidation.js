const { validateArticle } = require('../models/articles')

module.exports = (req, res, next) => {
  req.body.tags = JSON.parse(req.body.tags)
  console.log(req.body)
  console.log(req.file)
  if (req.method === "POST") {
    const { error } = validateArticle(req.body)
    if (error) return res.status(400).send(error)
    if (!req.file) return res.status(400).send('You must send an image with the article')
  }
  else next()
  console.log("paso")
}
