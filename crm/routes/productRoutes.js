const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');
const router = express.Router();
const upload = require('../middleware/uploads');

// Create Product
router.post('/product', upload, createProduct);

// Get All Products
router.get('/products', getAllProducts);

// Get Product by ID
router.get('/product/:id', getProductById);

// Update Product
router.put('/product/:id', upload, updateProduct);

// Delete Product
router.delete('/product/:id', deleteProduct);

module.exports = router;
