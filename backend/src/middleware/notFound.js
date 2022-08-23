module.exports = (request, response, next) => {
  response.status(404).send({
    message: 'Error 404 not Found'
  })
}
