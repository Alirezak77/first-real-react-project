const categoryModel = require("../../models/category");

exports.create = async (req, res) => {
  const { title, name } = req.body;

  const newCategory = await categoryModel.create({ title, name });

  return res.status(201).json(newCategory);
};

exports.getAll = async (req, res) => {
  const allCategories = await categoryModel.find()
  res.json(allCategories)
}
exports.remove = async (req, res) => {
  const deletedCategory = await categoryModel.findOneAndRemove({
    _id: req.params.id,
  });
  if (!deletedCategory) {
    res.status(404).json("Category Not Found!");
  }
  res.json(deletedCategory);
};

