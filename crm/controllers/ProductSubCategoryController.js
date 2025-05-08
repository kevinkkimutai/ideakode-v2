const { ProductSubCategory, ProductCategory } = require('../models'); // Import ProductSubCategory model

// Create a new product sub category
const createProductSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;

    if(categoryId) {
      const category = await ProductCategory.findOne({ id: categoryId });
      if(!category) {
        return res.status(404).json({ message: 'Product category not found 🥶' });
      }
    }
    // Create a new product sub category
    const category = await ProductSubCategory.create({
      name,
      description,
      categoryId
    });

    return res.status(201).json({ message: 'Product sub category created successfully', category });
  } catch (error) {
    console.error('Error creating product sub category:', error);
    return res.status(500).json({ message: 'Error creating product sub category', error: error.message });
  }
};

// Get all product categories
const getAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductSubCategory.findAll({
      include: [
        { model: ProductCategory, as: 'ParentCategory' },
      ]
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return res.status(500).json({ message: 'Error fetching product categories', error: error.message });
  }
};

// Get a single product sub category by ID
const getProductSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ProductSubCategory.findByPk(id, {
      include: [
        { model: ProductCategory, as: 'ParentCategory' },
      ]
    });

    if (!category) {
      return res.status(404).json({ message: 'Product sub category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching product sub category:', error);
    return res.status(500).json({ message: 'Error fetching product sub category', error: error.message });
  }
};

// Update a product sub category
const updateProductSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;

    // Validate parent category if categoryId is provided
    if (categoryId) {
      const parentCategory = await ProductCategory.findOne({ where: { id: categoryId } });
      if (!parentCategory) {
        return res.status(404).json({ message: 'Product category not found 🥶' });
      }
    }

    // Find the subcategory by ID
    const category = await ProductSubCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Product sub category not found 🥶' });
    }

    // Update fields if provided
    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (categoryId !== undefined) category.categoryId = categoryId;

    await category.save();

    return res.status(200).json({ message: 'Product sub category updated successfully 🎉', category });
  } catch (error) {
    console.error('Error updating product sub category:', error);
    return res.status(500).json({ message: 'Error updating product sub category 🥵', error: error.message });
  }
};


// Delete a product sub category
const deleteProductSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ProductSubCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Product sub category not found' });
    }

    await category.destroy();

    return res.status(200).json({ message: 'Product sub category deleted successfully' });
  } catch (error) {
    console.error('Error deleting product sub category:', error);
    return res.status(500).json({ message: 'Error deleting product sub category', error: error.message });
  }
};

module.exports = {
  createProductSubCategory,
  getAllProductCategories,
  getProductSubCategoryById,
  updateProductSubCategory,
  deleteProductSubCategory,
};
