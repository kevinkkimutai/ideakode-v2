const express = require('express');
const { createQuote, getAllQuotes, getQuoteById, updateQuote, deleteQuote } = require('../controllers/QuoteController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');


// Create Quote
router.post('/quote', auth, createQuote);

// Get All Quotes
router.get('/quotes', getAllQuotes);

// Get Quote by ID
router.get('/quote/:id', getQuoteById);

// Update Quote
router.put('/quote/:id', auth, updateQuote);

// Delete Quote
router.delete('/quote/:id', auth, deleteQuote);

module.exports = router;
