const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { default: mongoose } = require('mongoose')
const sharp = require('sharp')
const { Article } = require('../models/articles')
const { s3 } = require('../config/aws-s3.config')

module.exports.createArticleController = async (req, res) => {
  const { buffer, originalname, mimetype } = req.file

  const resizedBuffer = await sharp(buffer).resize({
    width: 1080,
    height: 1920,
    fit: 'contain'
  }).toBuffer()

  const imgName = `${Date.now()}-${originalname}`

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: imgName,
    Body: resizedBuffer,
    ContentType: mimetype
  })

  const article = new Article({ ...req.body, img: { name: imgName, mimetype } })

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newArticle = await article.save()
    const img = await s3.send(command)
    if (img.$metadata.httpStatusCode !== 200) throw new Error(img)
    res.send(newArticle)
    await session.commitTransaction()
  } catch (err) {
    res.status(500).send(err)
    await session.abortTransaction()
  }
  session.endSession()
}

module.exports.readAllArticlesController = async (req, res) => {
  const articles = await Article.find({}, 'title tags author_id img')
  res.send(articles)
}

module.exports.readArticleController = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id, '-img').exec()
    if (!article) res.send('No se encontró un archivo con el ID especificado')
    else res.send(article)
  } catch (err) {
    res.send(err)
  }
}

module.exports.deleteArticleController = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) res.send('No se encontró un archivo con el ID especificado')
    else {
      res.send(article)
    }
  } catch (err) {
    res.send(err)
  }
}
