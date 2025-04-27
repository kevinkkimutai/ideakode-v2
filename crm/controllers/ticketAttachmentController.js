const { TicketAttachment } = require('../models'); // Import the TicketAttachment model

// Create a new ticket attachment
const createTicketAttachment = async (req, res) => {
  try {
    const { ticketId, commentId, file_name, file_path, file_size, mime_type, uploaded_by } = req.body;

    // Create a new ticket attachment
    const attachment = await TicketAttachment.create({
      ticketId,
      commentId,
      file_name,
      file_path,
      file_size,
      mime_type,
      uploaded_by
    });

    return res.status(201).json({ message: 'Ticket attachment created successfully', attachment });
  } catch (error) {
    console.error('Error creating ticket attachment:', error);
    return res.status(500).json({ message: 'Error creating ticket attachment', error: error.message });
  }
};

// Get all ticket attachments
const getAllTicketAttachments = async (req, res) => {
  try {
    const attachments = await TicketAttachment.findAll();

    return res.status(200).json(attachments);
  } catch (error) {
    console.error('Error fetching ticket attachments:', error);
    return res.status(500).json({ message: 'Error fetching ticket attachments', error: error.message });
  }
};

// Get a single ticket attachment by ID
const getTicketAttachmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const attachment = await TicketAttachment.findByPk(id);

    if (!attachment) {
      return res.status(404).json({ message: 'Ticket attachment not found' });
    }

    return res.status(200).json(attachment);
  } catch (error) {
    console.error('Error fetching ticket attachment:', error);
    return res.status(500).json({ message: 'Error fetching ticket attachment', error: error.message });
  }
};

// Update a ticket attachment by ID
const updateTicketAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const { ticketId, commentId, file_name, file_path, file_size, mime_type, uploaded_by } = req.body;

    const attachment = await TicketAttachment.findByPk(id);
    if (!attachment) {
      return res.status(404).json({ message: 'Ticket attachment not found' });
    }

    // Update attachment details
    attachment.ticketId = ticketId;
    attachment.commentId = commentId;
    attachment.file_name = file_name;
    attachment.file_path = file_path;
    attachment.file_size = file_size;
    attachment.mime_type = mime_type;
    attachment.uploaded_by = uploaded_by;

    await attachment.save();

    return res.status(200).json({ message: 'Ticket attachment updated successfully', attachment });
  } catch (error) {
    console.error('Error updating ticket attachment:', error);
    return res.status(500).json({ message: 'Error updating ticket attachment', error: error.message });
  }
};

// Delete a ticket attachment by ID
const deleteTicketAttachment = async (req, res) => {
  try {
    const { id } = req.params;

    const attachment = await TicketAttachment.findByPk(id);
    if (!attachment) {
      return res.status(404).json({ message: 'Ticket attachment not found' });
    }

    await attachment.destroy();

    return res.status(200).json({ message: 'Ticket attachment deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket attachment:', error);
    return res.status(500).json({ message: 'Error deleting ticket attachment', error: error.message });
  }
};

module.exports = {
  createTicketAttachment,
  getAllTicketAttachments,
  getTicketAttachmentById,
  updateTicketAttachment,
  deleteTicketAttachment,
};
