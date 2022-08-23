const mongoose = require('mongoose')

const { DB_URI } = process.env

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  UseUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Cannot connect to DB', err))
