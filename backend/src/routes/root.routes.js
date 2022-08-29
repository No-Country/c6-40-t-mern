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
    <table >
      <thead>
        <tr>
          <th>Endpoint</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>/api/v1/user</td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>
  `)
})

module.exports = router
