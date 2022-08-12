const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const reUserId = /^[0-9a-fA-F]{24}$/

const commentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

const validateComment = (category) => {
    const schema = Joi.object({
        user_id: Joi.string().regex(reUserId).required().messages({ 'string.pattern.base': 'Invalid user_id: It must have an UUID format' }),
        content: Joi.string().required()
    })
    return schema.validate(category)
}

exports.Category = mongoose.model('Category', commentSchema)
exports.validateComment = validateComment