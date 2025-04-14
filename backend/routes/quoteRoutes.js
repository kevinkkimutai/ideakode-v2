const express = require('express');
const router = express.Router();
const authenticate = require("../middlewares/auth");
const {
  createQuote,
  updateStatus,
  getAllQuotes,
  deleteQuote
} = require('../controllers/quoteController');

// Create a new quote
router.post('/quote', createQuote);

// Update the status of a quote
router.patch('/quote/status', authenticate, updateStatus);

// Get all quotes
router.get('/quotes', authenticate, getAllQuotes);

// Delete a quote
router.delete('/quote', authenticate, deleteQuote);

module.exports = router;
