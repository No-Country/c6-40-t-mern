const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { default: mongoose } = require("mongoose");
const { Article } = require("../models/articles");
const { s3 } = require("../config/aws-s3.config");
const { imgUploadConfig } = require("../utils/imgUploadConfig");

const { BUCKET_NAME } = process.env

module.exports.createArticle = async (req, res) => {

    const { command, img } = imgUploadConfig(req.file)

    const article = new Article({ ...req.body, img })

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const newArticle = await article.save()
        const imgUpload = await s3.send(command)
        if (imgUpload['$metadata'].httpStatusCode !== 200) throw new Error(imgUpload)
        res.send(newArticle)
        await session.commitTransaction()
    } catch (err) {
        res.status(500).send(err)
        await session.abortTransaction()
    }
    session.endSession()
}

module.exports.readAllArticles = async (req, res) => {
    const articles = await Article.find({}, "title tags author_id img resume").lean()

    for (let article of articles) {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: article.img.name
        })
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        article.img.url = url
    }

    res.send(articles)
}

module.exports.readArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id, "-img").exec()
        if (!article) res.send("No se encontró un archivo con el ID especificado")
        else res.send(article)
    } catch (err) {
        res.send(err)
    }
}

module.exports.updateArticle = async (req, res) => {

    const { command: uploadCommand, img } = await imgUploadConfig(req.file)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const article = await Article.findByIdAndUpdate(req.params.id, { ...req.body, img })
        if (!article) res.status(400).send("No se encontró un archivo con el ID especificado")
        else {
            const deleteCommand = new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: article.img.name
            })
            const imgDeleted = await s3.send(deleteCommand)
            if (imgDeleted['$metadata'].httpStatusCode !== 204) throw new Error(imgDeleted)

            const imgUpload = await s3.send(uploadCommand)
            if (imgUpload['$metadata'].httpStatusCode !== 200) throw new Error(imgUpload)

            res.send(newArticle)
        }
        await session.commitTransaction()
    } catch (err) {
        res.send(err)
        await session.abortTransaction()
    }
    session.endSession()
}

module.exports.deleteArticle = async (req, res) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const article = await Article.findByIdAndDelete(req.params.id)
        if (!article) res.status(400).send("No se encontró un archivo con el ID especificado")
        else {
            const command = new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: article.img.name
            })
            const imgDeleted = await s3.send(command)
            if (imgDeleted['$metadata'].httpStatusCode !== 204) throw new Error(imgDeleted)
            res.send(article)
        }
        await session.commitTransaction()
    } catch (err) {
        res.status(500).send(err)
        await session.abortTransaction()
    }
    session.endSession()
}
