const { validateArticle } = require('../models/articles')

module.exports = (req, res, next) => {
<<<<<<< HEAD
    req.body.tags = JSON.parse(req.body.tags)
    const { error } = validateArticle(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    else next()
}
=======
  // if (req.user.isAdmin) return res.status(403).send('Acceso denegado')
  req.body.tags = JSON.parse(req.body.tags)
  const { error } = validateArticle(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  else next()
}
>>>>>>> main
