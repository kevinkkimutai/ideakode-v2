const express = require('express');
const { createQuoteItem, getAllQuoteItems, getQuoteItemById, updateQuoteItem, deleteQuoteItem } = require('../controllers/QuoteItemController');
const router = express.Router();


// Create Quote Item
router.post('/quote-items', createQuoteItem);

// Get All Quote Items
router.get('/quote-items', getAllQuoteItems);

// Get Quote Item by ID
router.get('/quote-items/:id', getQuoteItemById);

// Update Quote Item
router.put('/quote-items/:id', updateQuoteItem);

// Delete Quote Item
router.delete('/quote-items/:id', deleteQuoteItem);

module.exports = router;
