const { TicketComment, User } = require('../models'); // Import the TicketComment model

// Create a new ticket comment
const createTicketComment = async (req, res) => {
  try {
    const { ticketId, content, is_internal_note } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found 🥶.' });
    }

    // Create a new ticket comment
    const comment = await TicketComment.create({
      ticketId,
      userId: userId,
      content,
      is_internal_note
    });

    return res.status(201).json({ message: 'Ticket comment created successfully', comment });
  } catch (error) {
    console.error('Error creating ticket comment:', error);
    return res.status(500).json({ message: 'Error creating ticket comment', error: error.message });
  }
};

// Get all ticket comments for a specific ticket
const getTicketCommentsByTicketId = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const comments = await TicketComment.findAll({
      where: { ticketId },
      include: ['Ticket',
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
      ] // Include associated models (Ticket, User) if necessary
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching ticket comments:', error);
    return res.status(500).json({ message: 'Error fetching ticket comments', error: error.message });
  }
};

// Get a single ticket comment by ID
const getTicketCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await TicketComment.findByPk(id, {
      include: ['Ticket',
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
      ] // Include associated models (Ticket, User) if necessary
    });

    if (!comment) {
      return res.status(404).json({ message: 'Ticket comment not found' });
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching ticket comment:', error);
    return res.status(500).json({ message: 'Error fetching ticket comment', error: error.message });
  }
};

// Update a ticket comment by ID
const updateTicketComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, is_internal_note } = req.body;

    const comment = await TicketComment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Ticket comment not found' });
    }

    // Update comment details
    comment.content = content;
    comment.is_internal_note = is_internal_note;

    await comment.save();

    return res.status(200).json({ message: 'Ticket comment updated successfully', comment });
  } catch (error) {
    console.error('Error updating ticket comment:', error);
    return res.status(500).json({ message: 'Error updating ticket comment', error: error.message });
  }
};

// Delete a ticket comment by ID
const deleteTicketComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await TicketComment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Ticket comment not found' });
    }

    await comment.destroy();

    return res.status(200).json({ message: 'Ticket comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket comment:', error);
    return res.status(500).json({ message: 'Error deleting ticket comment', error: error.message });
  }
};

module.exports = {
  createTicketComment,
  getTicketCommentsByTicketId,
  getTicketCommentById,
  updateTicketComment,
  deleteTicketComment,
};
