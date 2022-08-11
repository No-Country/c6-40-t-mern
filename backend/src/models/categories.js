const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    }
}, { timestamps: true, versionKey: false })

const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required()
    })
    return schema.validate(category)
}

exports.Category = mongoose.model('Category', categorySchema)
exports.validateCategory = validateCategory