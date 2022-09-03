// <<<<<<< HEAD
// const { User } = require("../models/users");

// module.exports = async (req, res, next) => {
//   console.log(req.params.id);
//   const user = await User.find({ id: req.params.id });
//   console.log(user);
//   if (user.length === 0) {
//       const newUser = new User({ id: req.params.id });
//       console.log(newUser);
//     await newUser.save();
//   }
//   next();
// };
// =======
const { User } = require('../models/users')

module.exports = async (req, res, next) => {
  const user = await User.find({ id: req.params.id })
  if (user.length === 0) {
    const newUser = new User({ id: req.params.id })
    await newUser.save()
  }
  next()
}
// >>>>>>> 6c56ea487076d5a61ffef3c1b8aedeea1fa8148c
