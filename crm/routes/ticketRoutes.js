const express = require('express');
const { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, getAssignedTickets, getCustomerTickets } = require('../controllers/ticketController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');


// Create a new Ticket
router.post('/ticket', createTicket);

// Get all tickets
router.get('/tickets', getAllTickets);

// Get a single ticket by ID
router.get('/ticket/:id', auth, getTicketById);
router.get('/my-tickets', auth, getAssignedTickets);
router.get('/customer-tickets/:id', auth, getCustomerTickets);

// Update a ticket by ID
router.put('/ticket/:id', auth, updateTicket);

// Delete a ticket by ID
router.delete('/ticket/:id', auth, deleteTicket);

module.exports = router;
