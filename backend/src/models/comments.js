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
})

const validateComment = (category) => {
    const schema = Joi.object({
        user_id: Joi.string().regex(reUserId).required(),
        content: Joi.string().required()
    })
    return schema.validate(category)
}

exports.Category = mongoose.model('Category', commentSchema)
exports.validateComment = validateComment