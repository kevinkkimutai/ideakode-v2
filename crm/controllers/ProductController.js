const { uploadToR2, deleteFromR2 } = require('../middleware/uploadImage');
const { Product, ProductCategory, ProductSubCategory } = require('../models');
const logger = require('../utils/logger');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stagging_link, live_link, repo_link, is_active, status, categoryId, subCategoryId } = req.body;

    // Validate required fields
    if (!name || !price || !categoryId) {
      return res.status(400).json({ message: 'Name, price, and categoryId are required 🥶.' });
    }
    

    // Check if category exists
    const category = await ProductCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found 🥶' });
    }

    // If subCategoryId is provided, validate it
    if (subCategoryId) {
      const subCategory = await ProductSubCategory.findByPk(subCategoryId);
      if (!subCategory) {
        return res.status(400).json({ message: 'Invalid sub category 😡.' });
      }
    }


    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      stagging_link, 
      repo_link,
      live_link,
      repo_link,
      is_active,
      status,
      categoryId,
      subCategoryId,
    });

    return res.status(201).json({ message: 'Product created successfully 🎉', product });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error creating product 🥵', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductCategory, as: 'category' },
        { model: ProductSubCategory, as: 'subCategory' },
      ],
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        { model: ProductCategory, as: 'category' },
        { model: ProductSubCategory, as: 'subCategory' }
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, is_active, categoryId, status, repo_link, subCategoryId, stagging_link, live_link } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found 🥶' });
    }

    // Validate category if provided
    if (categoryId) {
      const category = await ProductCategory.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid categoryId ❌' });
      }
    }

    // Validate subCategory if provided
    if (subCategoryId) {
      const subCategory = await ProductSubCategory.findByPk(subCategoryId);
      if (!subCategory) {
        return res.status(400).json({ message: 'Invalid subCategoryId  ❌' });
      }
    }

    // Handle image update
    if (req.file) {
      try {
        if (product.image) {
          await deleteFromR2(product.image).catch(e =>
            logger.warn('Old image deletion warning:', e.message)
          );
        }
        product.image = await uploadToR2(req.file);
      } catch (uploadError) {
        return res.status(400).json({ message: 'Image upload failed ❌', error: uploadError.message });
      }
    }

    // Update fields (use nullish coalescing for accurate fallback)
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stagging_link = stagging_link ?? product.stagging_link;
    product.live_link = live_link ?? product.live_link;
    product.is_active = is_active ?? product.is_active;
    product.status = status ?? product.status;
    product.repo_link = repo_link ?? product.repo_link;
    product.categoryId = categoryId ?? product.categoryId;
    product.subCategoryId = subCategoryId ?? product.subCategoryId;

    await product.save();

    return res.status(200).json({ message: 'Product updated successfully 🎉', product });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product 🥵', error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found 🥶' });
    }

    // Delete image from R2 if it exists
    if (product.image) {
      try {
        await deleteFromR2(product.image);
      } catch (err) {
        console.warn('Failed to delete product image from R2:', err.message);
        // Continue even if image deletion fails
      }
    }

    // Delete product record
    await product.destroy();

    return res.status(200).json({ message: 'Product and image deleted successfully 🎉' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product 🥵', error: error.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
