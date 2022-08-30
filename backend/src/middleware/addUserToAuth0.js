const { User } = require("../models/users")

module.exports = async (req, res, next) => {
    const user = await User.find({ id: req.params.id })
    if (user.length === 0) {
        const newUser = new User({ id: req.params.id })
        console.log(newUser)
        await newUser.save()
    }
    next()
}
