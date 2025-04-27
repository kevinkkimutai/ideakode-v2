const { QuoteItem, Quote, Product } = require('../models'); // Import the QuoteItem model

// Create a new quote item
const createQuoteItem = async (req, res) => {
  try {
    const { quoteId, productId, quantity, unit_price, discount, total_price } = req.body;

    // Create a new quote item
    const quoteItem = await QuoteItem.create({
      quoteId,
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
        { model: Quote, attributes: ['status', 'valid_until'] }, // Including quote details
        { model: Product, attributes: ['name', 'description', 'price'] } // Including product details
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
        { model: Quote, attributes: ['status', 'valid_until'] }, // Including quote details
        { model: Product, attributes: ['name', 'description', 'price'] } // Including product details
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

    // Update the quote item details
    quoteItem.quoteId = quoteId;
    quoteItem.productId = productId;
    quoteItem.quantity = quantity;
    quoteItem.unit_price = unit_price;
    quoteItem.discount = discount;
    quoteItem.total_price = total_price;

    await quoteItem.save();

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
