const express = require('express')
const cors = require('cors')
require('dotenv').config()
<<<<<<< HEAD
=======
const app = express()

// const Sentry = require('@sentry/node')
// const Tracing = require('@sentry/tracing')

// Sentry.init({
//   dsn: 'https://ee0f3e6de9e04fb789cd1825c6d42bd9@o1374728.ingest.sentry.io/6682196',
//   integrations: [
//     new Sentry.Integrations.Http({ tracing: true }),
//     new Tracing.Integrations.Express({ app })
//   ],
//   tracesSampleRate: 1.0
// })
// app.use(Sentry.Handlers.requestHandler())
// app.use(Sentry.Handlers.tracingHandler())

// Routes import

>>>>>>> kenny
const user = require('./src/routes/user')
const articles = require('./src/routes/article')
const category = require('./src/routes/category')

const notFound = require('./src/middleware/notFound')
const handleError = require('./src/middleware/handleError')

const listEndpoints = require('express-list-endpoints')

app.use(
  express.json(),
  express.urlencoded({ extended: true })
)

// CORS: Permitir accesar desde un origen distinto
app.use(
  cors({
<<<<<<< HEAD
    origin: "http://localhost:3000",
    //Credenciales
=======
    origin: 'http://localhost:3000',
    // Credenciales
>>>>>>> kenny
    credentials: true
  })
)

require('./src/config/mongoose.config')

app.use('/api/v1/user', user)
app.use('/api/v1/article', articles)
app.use('/api/v1/category', category)

<<<<<<< HEAD
const port = process.env.PORT || 5000
=======
// Error handling
app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler())
app.use(handleError)

const port = process.env.PORT
>>>>>>> kenny
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
  console.log(listEndpoints(app))
})
