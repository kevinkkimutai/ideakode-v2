const express = require('express');
const { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();


// Create a new Ticket
router.post('/tickets', createTicket);

// Get all tickets
router.get('/tickets', getAllTickets);

// Get a single ticket by ID
router.get('/tickets/:id', getTicketById);

// Update a ticket by ID
router.put('/tickets/:id', updateTicket);

// Delete a ticket by ID
router.delete('/tickets/:id', deleteTicket);

module.exports = router;
