const express = require('express');
const { createQuote, getAllQuotes, getQuoteById, updateQuote, deleteQuote } = require('../controllers/QuoteController');
const router = express.Router();


// Create Quote
router.post('/quotes', createQuote);

// Get All Quotes
router.get('/quotes', getAllQuotes);

// Get Quote by ID
router.get('/quotes/:id', getQuoteById);

// Update Quote
router.put('/quotes/:id', updateQuote);

// Delete Quote
router.delete('/quotes/:id', deleteQuote);

module.exports = router;
