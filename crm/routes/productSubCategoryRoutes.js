const express = require('express');
const { createProductSubCategory, getAllProductCategories, getProductSubCategoryById, updateProductSubCategory, deleteProductSubCategory } = require('../controllers/ProductSubCategoryController');
const router = express.Router();


// Create Product Category
router.post('/sub-category', createProductSubCategory);

// Get All Product Categories
router.get('/sub-categories', getAllProductCategories);

// Get Product Category by ID
router.get('/sub-category/:id', getProductSubCategoryById);

// Update Product Category
router.put('/sub-category/:id', updateProductSubCategory);

// Delete Product Category
router.delete('/sub-category/:id', deleteProductSubCategory);

module.exports = router;
