const express = require('express');
require('dotenv').config()
const router = require('./src/routes/index')
const articles = require('./src/routes/article')
const app = express();


app.use(express.json(), express.urlencoded({ extended: true }));

require("./src/config/mongoose.config")

app.use('/api/v1', router)
app.use('/api/v1/article', articles)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))