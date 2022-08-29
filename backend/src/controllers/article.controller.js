const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { default: mongoose } = require('mongoose')
const { Article } = require('../models/articles')
const { s3 } = require('../config/aws-s3.config')
const { imgUploadConfig } = require('../utils/imgUploadConfig')
const { User } = require('../models/users')

const { BUCKET_NAME } = process.env

module.exports.createArticle = async (req, res, next) => {

  const { command, img } = await imgUploadConfig(req.file)

  const article = new Article({ ...req.body, img })
  console.log(article)

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newArticle = await article.save()
    const imgUpload = await s3.send(command)
    if (imgUpload.$metadata.httpStatusCode !== 200) throw new Error(imgUpload)

    const user = await User.findOneAndUpdate({ id: req.body.user_id }, { $push: { writings: article._id } }, { new: true })
    if (!user) req.status(403).send('No se encontró un usuario con el ID especificado')
    res.send(newArticle)
    await session.commitTransaction()
    session.endSession()
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    res.send(err)
  }
}
// session.endSession()

module.exports.readAllArticles = async (req, res, next) => {
  const articles = await Article.find({}, '_id title tags author_id img resume').lean()

  for (const article of articles) {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: article.img.name
    })
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    article.img.url = url
  }

  res.send(articles)
}

module.exports.readArticlesByCategory = async (req, res, next) => {

  const articles = await Article.find({ category: req.params.category }, '_id title tags author_id img resume').lean()

  for (const article of articles) {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: article.img.name
    })
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    article.img.url = url
  }

  res.send(articles.length === 0 ? 'No hay artículos disponibles para esa categoría' : articles)
}


module.exports.readArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id, '-img').exec()
    if (!article) res.send('No se encontró un archivo con el ID especificado')
    else res.send(article)
  } catch (err) {
    next(err)
  }
}

module.exports.updateArticle = async (req, res, next) => {

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newData = req.body
    if (req.file) {
      const { command: uploadCommand, img } = await imgUploadConfig(req.file)
      const deleteCommand = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: img.name
      })
      const imgDeleted = await s3.send(deleteCommand)
      if (imgDeleted.$metadata.httpStatusCode !== 204) throw new Error(imgDeleted)

      const imgUpload = await s3.send(uploadCommand)
      if (imgUpload.$metadata.httpStatusCode !== 200) throw new Error(imgUpload)

      newData.img = img
    }

    const article = await Article.findByIdAndUpdate(req.params.id, newData)
    if (!article) res.status(400).send('No se encontró un archivo con el ID especificado')
    res.send(article)
    await session.commitTransaction()
  } catch (err) {
    next(err)
    await session.abortTransaction()
  }
  session.endSession()
}

module.exports.deleteArticle = async (req, res, next) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) res.status(400).send('No se encontró un archivo con el ID especificado')
    else {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: article.img.name
      })
      const imgDeleted = await s3.send(command)
      if (imgDeleted.$metadata.httpStatusCode !== 204) throw new Error(imgDeleted)
      res.send(article)
    }
    await session.commitTransaction()
  } catch (err) {
    next(err)
    await session.abortTransaction()
  }
  session.endSession()
}
