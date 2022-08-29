const { User, validateUser } = require('../models/users')

module.exports.createUserController = async (req, res, next) => {
  const { err } = validateUser(req.body)
  if (err) return res.status(400).send(err.details[0].message)
  else {
    try {
      const user = new User(req.body)
      const newUser = await user.save()
      res.status(200).send(newUser)
    } catch (err) {
      next(err)
    }
  }
}

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params
  User.findOne({ id: id })
    .then(user => {
      // console.log(user)
      res.status(200).json({
        response: user
      })
    })
    .catch(err => next(err))
}

module.exports.updateUserById = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true })
    if (!user) res.status(400).send('No se encontró un usuario con el ID especificado')
    else res.send(user)
  } catch (err) {
    next(err)
  }
}

module.exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id })
    if (!user) res.status(400).send('No se encontró un usuario con el ID especificado')
    else res.send(user)
  } catch (err) {
    next(err)
  }
}

module.exports.addFavorite = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, { $push: { favorites: req.body._id } }, { new: true })
    if (!user) res.status(400).send('No se encontró un usuario con el ID especificado')
    else res.send(user)
  } catch (err) {
    next(err)
  }
}
