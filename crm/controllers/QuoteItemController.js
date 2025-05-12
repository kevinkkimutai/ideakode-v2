const { QuoteItem, Quote, Product, User } = require('../models'); // Import the QuoteItem model
const logAudit = require('../utils/auditLogger');

// Create a new quote item
const createQuoteItem = async (req, res) => {
  try {
    const { quoteId, productId, quantity, unit_price, discount, total_price } = req.body;

    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status("User not Found 🥶.")
    }
    // Create a new quote item
    const quoteItem = await QuoteItem.create({
      quoteId,
      created_by: userId,
      productId,
      quantity,
      unit_price,
      discount,
      total_price
    });

    return res.status(201).json({ message: 'Quote item created successfully', quoteItem });
  } catch (error) {
    console.error('Error creating quote item:', error);
    return res.status(500).json({ message: 'Error creating quote item', error: error.message });
  }
};

// Get all quote items
const getAllQuoteItems = async (req, res) => {
  try {
    const quoteItems = await QuoteItem.findAll({
      include: [
        {
          model: Quote,
          as: 'quote', attributes: ['status', 'valid_until'] 
        },
        { model: Product,  as: 'product', attributes: ['name', 'description', 'price'] } 
      ]
    });

    return res.status(200).json(quoteItems);
  } catch (error) {
    console.error('Error fetching quote items:', error);
    return res.status(500).json({ message: 'Error fetching quote items', error: error.message });
  }
};

// Get a single quote item by ID
const getQuoteItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const quoteItem = await QuoteItem.findByPk(id, {
      include: [
        {
          model: Quote,
          as: 'quote', attributes: ['status', 'valid_until'] 
        },
        { model: Product,  as: 'product', attributes: ['name', 'description', 'price'] } 
      ]
    });

    if (!quoteItem) {
      return res.status(404).json({ message: 'Quote item not found' });
    }

    return res.status(200).json(quoteItem);
  } catch (error) {
    console.error('Error fetching quote item:', error);
    return res.status(500).json({ message: 'Error fetching quote item', error: error.message });
  }
};

// Update a quote item
const updateQuoteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quoteId, productId, quantity, unit_price, discount, total_price } = req.body;

    const quoteItem = await QuoteItem.findByPk(id);
    if (!quoteItem) {
      return res.status(404).json({ message: 'Quote item not found' });
    }

    const oldValues = { ...quoteItem.get() };

    // Update the quote item details
    quoteItem.quoteId = quoteId;
    quoteItem.productId = productId;
    quoteItem.quantity = quantity;
    quoteItem.unit_price = unit_price;
    quoteItem.discount = discount;
    quoteItem.total_price = total_price;

    await quoteItem.save();

      // Audit log
      await logAudit({
        userId: req.user?.id || null,
        action: 'UPDATE',
        entity_type: 'QuoteItem',
        entity_id: quoteItem.id,
        old_values: JSON.stringify(oldValues),
        new_values: JSON.stringify(quoteItem.get()),
        ip_address: req.ip
      });

    return res.status(200).json({ message: 'Quote item updated successfully', quoteItem });
  } catch (error) {
    console.error('Error updating quote item:', error);
    return res.status(500).json({ message: 'Error updating quote item', error: error.message });
  }
};

// Delete a quote item
const deleteQuoteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const quoteItem = await QuoteItem.findByPk(id);
    if (!quoteItem) {
      return res.status(404).json({ message: 'Quote item not found' });
    }

    await quoteItem.destroy();

    return res.status(200).json({ message: 'Quote item deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote item:', error);
    return res.status(500).json({ message: 'Error deleting quote item', error: error.message });
  }
};

module.exports = {
  createQuoteItem,
  getAllQuoteItems,
  getQuoteItemById,
  updateQuoteItem,
  deleteQuoteItem,
};
