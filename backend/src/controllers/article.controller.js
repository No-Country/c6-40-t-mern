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
        res.status(500).send('No se ha podido procesar la solicitud, inténtelo más tarde')
    }
}