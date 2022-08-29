const express = require('express')
const cors = require('cors')
require('dotenv').config()
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

const user = require('./src/routes/user')
const articles = require('./src/routes/article')
const category = require('./src/routes/category')

const notFound = require('./src/middleware/notFound')
const handleError = require('./src/middleware/handleError')

const listEndpoints = require('express-list-endpoints')

// CORS: Permitir accesar desde un origen distinto
app.use(
  cors({
    origin: 'http://localhost:3000',
    // Credenciales
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./src/config/mongoose.config')

app.use('/api/v1/user', user)
app.use('/api/v1/article', articles)
app.use('/api/v1/category', category)

// Error handling
//app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler())
//app.use(handleError)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
  console.log(listEndpoints(app))
})
