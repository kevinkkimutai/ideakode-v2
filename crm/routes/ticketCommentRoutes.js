const express = require('express');
const { createTicketComment, getTicketCommentsByTicketId, getTicketCommentById, updateTicketComment, deleteTicketComment } = require('../controllers/TicketCommentController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');


// Create a new Ticket Comment
router.post('/ticket-comment', auth, createTicketComment);

// Get all ticket comments for a specific ticket
router.get('/ticket-comment/ticket/:ticketId', auth, getTicketCommentsByTicketId);

// Get a single ticket comment by ID
router.get('/ticket-comment/:id', auth, getTicketCommentById);

// Update a ticket comment by ID
router.put('/ticket-comment/:id', auth, updateTicketComment);

// Delete a ticket comment by ID
router.delete('/ticket-comment/:id', auth, deleteTicketComment);

module.exports = router;
