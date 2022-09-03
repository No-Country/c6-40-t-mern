const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  articleId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    require: true
  }
}, { timestamps: true, versionKey: false })

const validateComment = (comment) => {
  const schema = Joi.object({
    articleId: Joi.string().required(),
    content: Joi.string().required()
  })
  return schema.validate(comment)
}

exports.Comment = mongoose.model('Comment', commentSchema)
exports.validateComment = validateComment
