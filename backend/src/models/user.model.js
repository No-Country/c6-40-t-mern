const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
  firstName: {
      type: String,
      required: [true, "Nombre obligatorio."]
  },
  lastName: {
      type: String,
      required: [true, "Apellido obligatorio."]
  },
  email: {
      type: String,
      required: [true, "E-mail obligatorio"],
      validate: {
          validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          message: "Ingrese email válido"
      },
      unique: true
  },
  password: {
      type: String,
      required: [true, "Password obligatorio."],
      minlength: [8, "Password debe tener al menos 8 caracteres"]
  }
}, {timestamps: true, versionKey: false})

UserSchema.virtual('confirmPassword')
    .get( ()=> this._confirmPassword )
    .set( value => this._confirmPassword = value )

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas no coinciden');
    }
    next();
})

const User = mongoose.model("users", UserSchema);

module.exports = {
  User
};
