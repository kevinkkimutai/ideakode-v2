const express = require('express');
const { createTicketCategory, getAllTicketCategories, getTicketCategoryById, updateTicketCategory, deleteTicketCategory } = require('../controllers/ticketCategoryController');
const router = express.Router();


// Create a new Ticket Category
router.post('/ticket-categories', createTicketCategory);

// Get all ticket categories
router.get('/ticket-categories', getAllTicketCategories);

// Get a single ticket category by ID
router.get('/ticket-categories/:id', getTicketCategoryById);

// Update a ticket category by ID
router.put('/ticket-categories/:id', updateTicketCategory);

// Delete a ticket category by ID
router.delete('/ticket-categories/:id', deleteTicketCategory);

module.exports = router;
