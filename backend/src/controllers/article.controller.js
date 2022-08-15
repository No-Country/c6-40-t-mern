const sharp = require("sharp");
const { Article } = require("../models/articles");

module.exports.createArticleController = async (req, res) => {

    const { buffer, ...imgProperties } = req.file

    const resizedBuffer = await sharp(buffer).resize({
        width: 1080,
        height: 1920,
        fit: 'contain'
    }).toBuffer()

    const article = new Article({ ...req.body, img: { ...imgProperties, buffer: resizedBuffer } })

    try {
        await article.save()
        res.send(req.body)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.readAllArticlesController = async (req, res) => {
    const articles = await Article.find({}, "title tags")
    res.send(articles)
}

module.exports.readArticleController = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id, "-img").exec()
        if (!article) res.send("No se encontró un archivo con el ID especificado")
        else res.send(article)
    } catch (err) {
        res.send(err)
    }
}

module.exports.deleteArticleController = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id)
        if (!article) res.send("No se encontró un archivo con el ID especificado")
        else {
            res.send(article)
        }
    } catch (err) {
        res.send(err)
    }
}