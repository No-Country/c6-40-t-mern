const express = require('express');
const cors = require('cors')
require('dotenv').config()
const user = require('./src/routes/user')
const articles = require('./src/routes/article')
const app = express();


app.use(express.json(), express.urlencoded({ extended: true }));

//Permitir accesar desde un origen distinto
app.use (
  cors( {
      origin: "http://localhost:3000",
      //Credenciales
      credentials: true
  })
)


require("./src/config/mongoose.config")

app.use('/api/v1/user', user)
app.use('/api/v1/article', articles)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))