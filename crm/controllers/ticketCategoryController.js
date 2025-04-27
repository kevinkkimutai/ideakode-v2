const { TicketCategory } = require('../models'); // Import the TicketCategory model

// Create a new ticket category
const createTicketCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new ticket category
    const category = await TicketCategory.create({
      name,
      description
    });

    return res.status(201).json({ message: 'Ticket category created successfully', category });
  } catch (error) {
    console.error('Error creating ticket category:', error);
    return res.status(500).json({ message: 'Error creating ticket category', error: error.message });
  }
};

// Get all ticket categories
const getAllTicketCategories = async (req, res) => {
  try {
    const categories = await TicketCategory.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching ticket categories:', error);
    return res.status(500).json({ message: 'Error fetching ticket categories', error: error.message });
  }
};

// Get a single ticket category by ID
const getTicketCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await TicketCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Ticket category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching ticket category:', error);
    return res.status(500).json({ message: 'Error fetching ticket category', error: error.message });
  }
};

// Update a ticket category by ID
const updateTicketCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await TicketCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Ticket category not found' });
    }

    // Update category details
    category.name = name;
    category.description = description;

    await category.save();

    return res.status(200).json({ message: 'Ticket category updated successfully', category });
  } catch (error) {
    console.error('Error updating ticket category:', error);
    return res.status(500).json({ message: 'Error updating ticket category', error: error.message });
  }
};

// Delete a ticket category by ID
const deleteTicketCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await TicketCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Ticket category not found' });
    }

    await category.destroy();

    return res.status(200).json({ message: 'Ticket category deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket category:', error);
    return res.status(500).json({ message: 'Error deleting ticket category', error: error.message });
  }
};

module.exports = {
  createTicketCategory,
  getAllTicketCategories,
  getTicketCategoryById,
  updateTicketCategory,
  deleteTicketCategory,
};
