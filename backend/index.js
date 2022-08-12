const express = require('express');
const router = require('./src/routes/index')
const app = express();


app.use(express.json(), express.urlencoded({ extended: true }));

require("./src/config/mongoose.config")

app.use('/api/v1', router)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))