const { Ticket } = require('../models'); // Import the Ticket model

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { customerId, contactId, assigned_to, subject, description, status, priority, categoryId, resolved_at } = req.body;

    // Create a new ticket
    const ticket = await Ticket.create({
      customerId,
      contactId,
      assigned_to,
      subject,
      description,
      status,
      priority,
      categoryId,
      resolved_at
    });

    return res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();

    return res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, contactId, assigned_to, subject, description, status, priority, categoryId, resolved_at } = req.body;

    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update ticket details
    ticket.customerId = customerId;
    ticket.contactId = contactId;
    ticket.assigned_to = assigned_to;
    ticket.subject = subject;
    ticket.description = description;
    ticket.status = status;
    ticket.priority = priority;
    ticket.categoryId = categoryId;
    ticket.resolved_at = resolved_at;

    await ticket.save();

    return res.status(200).json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.destroy();

    return res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
