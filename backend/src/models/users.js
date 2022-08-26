const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    default: ''
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  writings: {
    type: [Schema.Types.ObjectId],
    default: []
  }
}, { timestamps: true, versionKey: false, _id: false })

const validateUser = (user) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })
  return schema.validate(user)
}

userSchema.pre('save', function (next) {
  mongoose.models.User.findOne({ id: this.id }, function (err, results) {
    if (err) {
      console.log(err)
    } else if (results) { // there was a result found, so the a id exists
      console.error('id must be unique')
    }
    next()
  })
})

exports.User = mongoose.model('User', userSchema)
exports.validateUser = validateUser
