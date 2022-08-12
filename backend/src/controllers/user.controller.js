const { User } = require("../models/users");

module.exports.createUserController = (req, res) => {
  const user = new User(req.body);

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