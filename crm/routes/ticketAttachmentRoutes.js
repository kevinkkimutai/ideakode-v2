const express = require('express');
const { createTicketAttachment, getAllTicketAttachments, getTicketAttachmentById, updateTicketAttachment, deleteTicketAttachment } = require('../controllers/ticketAttachmentController');
const router = express.Router();


// Create a new Ticket Attachment
router.post('/ticket-attachments', createTicketAttachment);

// Get all ticket attachments
router.get('/ticket-attachments', getAllTicketAttachments);

// Get a single ticket attachment by ID
router.get('/ticket-attachments/:id', getTicketAttachmentById);

// Update a ticket attachment by ID
router.put('/ticket-attachments/:id', updateTicketAttachment);

// Delete a ticket attachment by ID
router.delete('/ticket-attachments/:id', deleteTicketAttachment);

module.exports = router;
