const express = require('express');
const { createQuoteItem, getAllQuoteItems, getQuoteItemById, updateQuoteItem, deleteQuoteItem } = require('../controllers/QuoteItemController');
const router = express.Router();

const {auth, authorizeRole} = require('../middleware/auth');


// Create Quote Item
router.post('/quote-item', auth, createQuoteItem);

// Get All Quote Items
router.get('/quote-items', getAllQuoteItems);

// Get Quote Item by ID
router.get('/quote-item/:id', getQuoteItemById);

// Update Quote Item
router.put('/quote-item/:id', auth, updateQuoteItem);

// Delete Quote Item
router.delete('/quote-item/:id', auth, deleteQuoteItem);

module.exports = router;
