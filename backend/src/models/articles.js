const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const reUserId = /^[0-9a-fA-F]{24}$/

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    user_id: {
        type: Schema.Types.ObjectId
    },
    content: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
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
        user_id: Joi.string().regex(reUserId).required().messages({ 'string.pattern.base': 'Invalid password: It must container at least  one uppercase letter, one lowercase letter and one number.' }),
        content: Joi.string().required(),
        img: Joi.string().required(),
        tags: Joi.array().required()
    })
    return schema.validate(article)
}

exports.Article = mongoose.model('User', articleSchema)
exports.validateUser = validateArticle