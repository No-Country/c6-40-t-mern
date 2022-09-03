const { Comment } = require('../models/comment.model')

const { Article } = require('../models/articles')

module.exports.createComment = async (req, res, next) => {
  if (req.body === null) {
    res.status(400).json({
      message: 'body is null'
    })
  }

  const { userId, articleId, content } = req.body
  // console.log(req.body)
  const article = await Article.findById(articleId)

  const newComment = new Comment({
    articleId: article._id,
    userId,
    content
  })

  try {
    const savedComment = await newComment.save()

    const updatedArticle = await Article.findOneAndUpdate({ _id: articleId }, { $push: { comments: savedComment._id } }, { new: true })
    res.status(200).json({
      data: updatedArticle
    })
  } catch (error) {
    next(error)
  }
}

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
