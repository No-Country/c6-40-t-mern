const { User } = require('../models/users')

module.exports.createUserController = (req, res) => {
  const user = new User(req.body)

  user.save()
    .then(user => {
      console.log(user)
      res.status(200).json({ user })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ err })
    })
}

module.exports.getUserById = (req, res) => {
  const { id } = req.params
  User.findOne({ _id: id })
    .then(user => {
      console.log(user)
      res.status(200).json({
        response: user
      })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({
        response: err
      })
    })
}

module.exports.deleteUserById = (req, res) => {
  const { id } = req.params
  User.deleteOne({ _id: id })
    .then(res => {
      res.json({
        response: res
      })
    })
    .catch(err => {
      res.status(400).json({
        response: err
      })
    })
}

module.exports.updateUserById = (req, res) => {
  const { id } = req.params
  User.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
    .then(user => {
      console.log(user)
      res.status(200).json({
        response: user
      })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({
        response: err
      })
    })
}
