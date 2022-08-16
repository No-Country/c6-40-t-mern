const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const reUserId = /^[0-9a-fA-F]{24}$/

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
        maxlength: 50,
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
        title: Joi.string().min(6).max(50).required(),
        user_id: Joi.string().regex(reUserId).required().messages({ 'string.pattern.base': 'Invalid user_id: It must have an MongoDB ObjectID format' }),
        content: Joi.string().required(),
        // img: Joi.object({
        //     fieldname: Joi.string().required(),
        //     originalname: Joi.string().required(),
        //     encoding: Joi.string().required(),
        //     mimetype: Joi.string().required(),
        //     buffer: Joi.string().required(),
        //     size: Joi.number().required()
        // }).required(),
        tags: Joi.array().required()
    })
    return schema.validate(article)
}

exports.Article = mongoose.model('Article', articleSchema)
exports.validateArticle = validateArticle