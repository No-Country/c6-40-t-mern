const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const reUserId = /^[0-9a-fA-F]{24}$/
const categories = ['a']

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
})

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
        unique: true
    },
    author_id: {
        type: Schema.Types.ObjectId
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
        required: true,
        enum: categories
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
        user_id: Joi.string().regex(reUserId).required().messages({ 'string.pattern.base': 'Invalid user_id: It must have an MongoDB ObjectID format' }),
        content: Joi.string().required(),
        img: Joi.object({
            name: Joi.string().required(),
            mimetype: Joi.string().required(),
        }).required(),
        category: Joi.string().valid(...categories).required(),
        tags: Joi.array().required()
    })
    return schema.validate(article)
}

exports.Article = mongoose.model('Article', articleSchema)
exports.validateArticle = validateArticle