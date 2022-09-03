const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Blogg</title>
  </head>
  <body>
    <h1>API Blogger</h1>
    <h2>/api/v1</h2>
    <h3>Endpoint Comments</h3>
    <table>
      <thead>
          <tr>
              <th>Method</th><th>URI</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>POST</td><td>/comment</td>
          </tr>
          <tr>
            <td>GET</td><td>/comment/:idArticle</td>
          </tr>
          <tr>
            <td>DELETE</td><td>/comment/:id</td>
          </tr>
      </tbody>
    <table>
  </body>
  </html>
  `)
})

module.exports = router
