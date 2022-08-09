const { default: mongoose } = require("mongoose");
const express = require('express');
const { urlencoded } = require("express");
const app = express()

async function main() {
    await mongoose.connect('mongodb://localhost:27017/backend-blog');
}

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log('No se pudo conectar a la base de datos', err));


app.use(express.json());
app.use(urlencoded({ extended: true }))


const port = process.env.port || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))