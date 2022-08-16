const mongoose = require("mongoose");

const uri = 'mongodb+srv://kenny:Nl73Cz2gYPYr0FAK@cluster0.iy5hvbg.mongodb.net/blog-noticias'

mongoose.connect(uri , {
  useNewUrlParser: true,
  UseUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Cannot connect to DB', err));