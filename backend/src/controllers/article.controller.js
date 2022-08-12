const { Article } = require("../models/articles");

module.exports.createArticleController = (req, res) => {
    console.log(req.file)

    req.file


    res.send(req.body)
}