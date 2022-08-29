const { Comment } = require('../models/comment.model')

const { Article } = require('../models/articles')

module.exports.createComment = (req, res, next) => {
  if (req.body === null) {
    res.status(400).json({
      message: 'body is null'
    })
  }

  const { userId, content } = req.body
  // console.log(req.body)
  const newComment = new Comment({
    userId,
    content
  })
  newComment.save()
    .then(response => {
      res.status(200).json({
        data: response
      })
    })
    .catch(err => next(err))
}

// readArticle
module.exports.readCommentsOfArticleById = (req, res, next) => {
  const { idArticle } = req.params

  Article.findById(idArticle, 'comments')
    .then(response => {
      res.status(200).json({ response })
    })
    .catch(err => next(err))
}
module.exports.deleteCommentById = (req, res, next) => {
  const { id } = req.params

  Comment.findOneAndRemove({ _id: id })
    .then(response => {
      res.status(200).json({
        message: response
      })
    })
    .catch(err => next(err))
}
