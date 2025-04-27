const express = require('express');
const { createTicketComment, getTicketCommentsByTicketId, getTicketCommentById, updateTicketComment, deleteTicketComment } = require('../controllers/TicketCommentController');
const router = express.Router();


// Create a new Ticket Comment
router.post('/ticket-comments', createTicketComment);

// Get all ticket comments for a specific ticket
router.get('/ticket-comments/ticket/:ticketId', getTicketCommentsByTicketId);

// Get a single ticket comment by ID
router.get('/ticket-comments/:id', getTicketCommentById);

// Update a ticket comment by ID
router.put('/ticket-comments/:id', updateTicketComment);

// Delete a ticket comment by ID
router.delete('/ticket-comments/:id', deleteTicketComment);

module.exports = router;
