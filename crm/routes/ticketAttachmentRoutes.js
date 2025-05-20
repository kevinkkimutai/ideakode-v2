const express = require('express');
const { createTicketAttachment, getAllTicketAttachments, getTicketAttachmentById, updateTicketAttachment, deleteTicketAttachment } = require('../controllers/ticketAttachmentController');
const router = express.Router();


// Create a new Ticket Attachment
router.post('/ticket-attachment', createTicketAttachment);

// Get all ticket attachments
router.get('/ticket-attachments', getAllTicketAttachments);

// Get a single ticket attachment by ID
router.get('/ticket-attachment/:id', getTicketAttachmentById);

// Update a ticket attachment by ID
router.put('/ticket-attachment/:id', updateTicketAttachment);

// Delete a ticket attachment by ID
router.delete('/ticket-attachment/:id', deleteTicketAttachment);

module.exports = router;
