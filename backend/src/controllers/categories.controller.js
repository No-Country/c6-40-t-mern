const { Category } = require('../models/categories')

module.exports.createCategory = async (req, res) => {
  const category = new Category(req.body)

  try {
    const newCategory = await category.save()
    res.send(newCategory)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports.readCategories = async (req, res) => {
  const categories = await Category.find({})
  res.send(categories)
}

module.exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(category)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports.removeCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id)
  res.send(category)
}
