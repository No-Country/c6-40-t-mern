const { auth } = require('express-oauth2-jwt-bearer')

const {
    AUTH0_API,
    AUTH0_DOMAIN_URL
} = process.env

module.exports.checkJwt = auth({
    audience: AUTH0_API,
    issuerBaseURL: AUTH0_DOMAIN_URL,
})