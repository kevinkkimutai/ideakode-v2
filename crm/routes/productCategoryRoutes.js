const express = require('express');
const { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } = require('../controllers/ProductCategoryController');
const router = express.Router();


// Create Product Category
router.post('/categories', createProductCategory);

// Get All Product Categories
router.get('/categories', getAllProductCategories);

// Get Product Category by ID
router.get('/categories/:id', getProductCategoryById);

// Update Product Category
router.put('/categories/:id', updateProductCategory);

// Delete Product Category
router.delete('/categories/:id', deleteProductCategory);

module.exports = router;
