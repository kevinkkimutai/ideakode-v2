const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');
const router = express.Router();

// Create Product
router.post('/products', createProduct);

// Get All Products
router.get('/products', getAllProducts);

// Get Product by ID
router.get('/products/:id', getProductById);

// Update Product
router.put('/products/:id', updateProduct);

// Delete Product
router.delete('/products/:id', deleteProduct);

module.exports = router;
