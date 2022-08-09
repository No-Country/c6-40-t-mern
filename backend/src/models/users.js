const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
const validatePassword = (password) => rePassword.test(password)

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
        validate: [validatePassword, "Invalid password: It must container at least  one uppercase letter, one lowercase letter and one number."]
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    role: {
        type: String,
        enum: ['user', 'writer', 'admin'],
        default: 'user'
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    writings: {
        type: [Schema.Types.ObjectId],
        default: function () {
            if (this.role === 'writer') return []
            return null
        }
    }
})

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(8).max(1024).regex(rePassword).required(),
        email: Joi.string().min(5).max(255).required().email(),
        role: Joi.string().valid('user', 'writer', 'admin').required()
    })
    return schema.validate(user)
}

const User = mongoose.model('User', userSchema)

userBody = {
    username: 'Eternialis',
    password: '123454667eD',
    role: 'user',
    email: 'hardmeierlua@gmail.com'
}
const { error } = validateUser(userBody);
if (error) console.log(error)
else {
    const user = new User(userBody)
    console.log(user)
}

exports.User = mongoose.model('User', userSchema)
exports.validateUser = validateUser