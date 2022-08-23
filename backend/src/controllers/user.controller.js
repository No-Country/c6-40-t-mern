const { User } = require('../models/users')

module.exports.createUserController = (req, res, next) => {
  const user = new User(req.body)

  user.save()
    .then(user => {
      console.log(user)
      res.status(200).json({ user })
    })
    .catch(err => next(err))
}

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params
  User.findOne({ _id: id })
    .then(user => {
      // console.log(user)
      res.status(200).json({
        response: user
      })
    })
    .catch(err => next(err))
}

module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params
  User.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
    .then(user => {
      console.log(user)
      res.status(200).json({
        response: user
      })
    })
    .catch(err => next(err))
}

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params
  User.deleteOne({ _id: id })
    .then(res => {
      res.json({
        response: res
      })
    })
    .catch(err => next(err))
}
