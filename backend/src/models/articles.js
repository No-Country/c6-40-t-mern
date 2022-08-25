const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const categories = ['a']

// const imageSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   mimetype: {
//     type: String,
//     required: true
//   }
// })

const articleSchema = new Schema({
  title: {
    type: String,
    minlength: 6,
    maxlength: 100,
    unique: true
  },
  author_id: {
    type: String
  },
  resume: {
    type: String
  },
  content: {
    type: String
  },
  img: {
  },
  category: {
    type: String,
    enum: categories
  },
  tags: {
    type: [String]
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
    user_id: Joi.string().required().messages({ 'string.pattern.base': 'Invalid user_id: It must have an MongoDB ObjectID format' }),
    resume: Joi.string().required(),
    content: Joi.string().required(),
    img: Joi.object({
      name: Joi.string().required(),
      mimetype: Joi.string().required()
    }).required(),
    category: Joi.string().valid(...categories).required(),
    tags: Joi.array().required()
  })
  return schema.validate(article)
}

exports.Article = mongoose.model('Article', articleSchema)
exports.validateArticle = validateArticle
