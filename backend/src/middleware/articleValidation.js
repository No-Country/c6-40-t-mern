const { validateArticle } = require("../models/articles")

module.exports = (req, res, next) => {
    req.body.tags = JSON.parse(req.body.tags)
    const { error } = validateArticle(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    else next()
}