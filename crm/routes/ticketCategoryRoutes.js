const express = require('express');
const { createTicketCategory, getAllTicketCategories, getTicketCategoryById, updateTicketCategory, deleteTicketCategory } = require('../controllers/ticketCategoryController');
const router = express.Router();


// Create a new Ticket Category
router.post('/ticket-category', createTicketCategory);

// Get all ticket categories
router.get('/ticket-categories', getAllTicketCategories);

// Get a single ticket category by ID
router.get('/ticket-category/:id', getTicketCategoryById);

// Update a ticket category by ID
router.put('/ticket-category/:id', updateTicketCategory);

// Delete a ticket category by ID
router.delete('/ticket-category/:id', deleteTicketCategory);

module.exports = router;
