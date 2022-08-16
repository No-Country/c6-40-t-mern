const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcrypt')

const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
const validatePassword = (password) => rePassword.test(password)

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
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
    maxlength: 255,
    unique: true
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
}, { timestamps: true, versionKey: false })

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(1024).regex(rePassword).required().messages({ 'string.pattern.base': 'Invalid password: It must container at least  one uppercase letter, one lowercase letter and one number.' }),
    email: Joi.string().min(5).max(255).required().email(),
    role: Joi.string().valid('user', 'writer', 'admin').required()
  })
  return schema.validate(user)
}
userSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value)

userSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Las contraseñas no coinciden');
  }
  next();
})

userSchema.pre("save", function(next) {
  mongoose.models["User"].findOne({email : this.email},function(err, results) {
      if(err) {
          console.log(err)
      } else if(results) { //there was a result found, so the email address exists
          console.error("email must be unique");
      } 
      next()
  });
});

//Antes de guardar usuario, encriptamos contraseña
userSchema.pre('save', function(next){
  bcrypt.hash(this.password, 10)
      .then(hash => {
          this.password = hash;
          next();
      });
});

exports.User = mongoose.model('User', userSchema)
exports.validateUser = validateUser