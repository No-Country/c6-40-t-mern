const { User } = require("../models/users");

module.exports = async (req, res, next) => {
  console.log(req.params.id);
  const user = await User.find({ id: req.params.id });
  console.log(user);
  if (user.length === 0) {
      const newUser = new User({ id: req.params.id });
      console.log(newUser);
    await newUser.save();
  }
  next();
};
