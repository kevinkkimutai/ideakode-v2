const { Category, Project } = require('../models');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    // if (!name ||!description) {
    //   return res.status(400).json({ error: 'Name and description are required' });
    // }
    const category = await Category.create({ name, description, status });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(
        {
            include: [{ model: Project, as: 'project' }],
          }
    );
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
          include: [{ model: Project, as: 'project' }],
        });
        if (!category) return res.status(404).json({ message: 'Category not found' });
    
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    
    const { id, name, description, status } = req.body;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.update({ name, description, status });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const {id} = req.body
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}