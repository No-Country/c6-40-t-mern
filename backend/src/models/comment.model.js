const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false })

const validateComment = (comment) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().required()
  })
  return schema.validate(comment)
}

exports.Comment = mongoose.model('Comment', commentSchema)
exports.validateComment = validateComment
