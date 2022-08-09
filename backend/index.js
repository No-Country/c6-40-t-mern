const express = require('express');

const app = express()

app.use( express.json(), express.urlencoded({ extended: true }) );

require("./src/config/mongoose.config")

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))