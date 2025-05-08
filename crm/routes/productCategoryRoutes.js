const express = require('express');
const { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } = require('../controllers/ProductCategoryController');
const router = express.Router();


// Create Product Category
router.post('/category', createProductCategory);

// Get All Product Categories
router.get('/categories', getAllProductCategories);

// Get Product Category by ID
router.get('/category/:id', getProductCategoryById);

// Update Product Category
router.put('/category/:id', updateProductCategory);

// Delete Product Category
router.delete('/category/:id', deleteProductCategory);

module.exports = router;
