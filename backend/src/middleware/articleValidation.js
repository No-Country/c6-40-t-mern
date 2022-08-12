const { validateArticle } = require("../models/articles")

module.exports = (req, res, next) => {

    // if (req.user.isAdmin) return res.status(403).send('Acceso denegado')

    const { error } = validateArticle(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    next()
}