const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/backend-blog', {
  useNewUrlParser: true,
  UseUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Cannot connect to DB', err));