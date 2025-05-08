const { ProductCategory, ProductSubCategory } = require('../models'); // Import ProductCategory model

// Create a new product category
const createProductCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new product category
    const category = await ProductCategory.create({
      name,
      description,
    });

    return res.status(201).json({ message: 'Product category created successfully 🎉', category });
  } catch (error) {
    console.error('Error creating product category:', error);
    return res.status(500).json({ message: 'Error creating product category', error: error.message });
  }
};

// Get all product categories
const getAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.findAll({
      include: [
        { model: ProductSubCategory, as: 'SubCategories' }
      ]
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return res.status(500).json({ message: 'Error fetching product categories', error: error.message });
  }
};

// Get a single product category by ID
const getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ProductCategory.findByPk(id, {
      include: [
        { model: ProductSubCategory, as: 'SubCategories' } 
      ]
    });

    if (!category) {
      return res.status(404).json({ message: 'Product category not found 🥶' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching product category:', error);
    return res.status(500).json({ message: 'Error fetching product category', error: error.message });
  }
};

// Update a product category
const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description} = req.body;

    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found 🥶' });
    }

    // Update the category details
    category.name = name;
    category.description = description;

    await category.save();

    return res.status(200).json({ message: 'Product category updated successfully 🎉', category });
  } catch (error) {
    console.error('Error updating product category:', error);
    return res.status(500).json({ message: 'Error updating product category', error: error.message });
  }
};

// Delete a product category
const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }

    await category.destroy();

    return res.status(200).json({ message: 'Product category deleted successfully' });
  } catch (error) {
    console.error('Error deleting product category:', error);
    return res.status(500).json({ message: 'Error deleting product category', error: error.message });
  }
};

module.exports = {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};
