const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  }
})

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  author_id: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  img: {
    type: imageSchema,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  favorites: {
    type: Number,
    default: 0
  },
  comments: {
    type: [Schema.Types.ObjectId],
    default: []
  }
}, { timestamps: true, versionKey: false })

const validateArticle = (article) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(100).required(),
    author_id: Joi.string().required(),
    resume: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array().required()
  })
  return schema.validate(article)
}

exports.Article = mongoose.model('Article', articleSchema)
exports.validateArticle = validateArticle
