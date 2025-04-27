const { Quote, Opportunity, User, QuoteItem } = require('../models'); // Import the Quote model

// Create a new quote
const createQuote = async (req, res) => {
  try {
    const { opportunityId, created_by, status, valid_until, subtotal, tax, discount, total, notes } = req.body;

    // Create a new quote
    const quote = await Quote.create({
      opportunityId,
      created_by,
      status,
      valid_until,
      subtotal,
      tax,
      discount,
      total,
      notes
    });

    return res.status(201).json({ message: 'Quote created successfully', quote });
  } catch (error) {
    console.error('Error creating quote:', error);
    return res.status(500).json({ message: 'Error creating quote', error: error.message });
  }
};

// Get all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      include: [
        { model: Opportunity, attributes: ['name'] }, // Including opportunity details
        { model: User, attributes: ['name'] }, // Including user (created by) details
        { model: QuoteItem, attributes: ['description', 'quantity', 'unit_price', 'total_price'] } // Including quote items
      ]
    });

    return res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};

// Get a single quote by ID
const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findByPk(id, {
      include: [
        { model: Opportunity, attributes: ['name'] }, // Including opportunity details
        { model: User, attributes: ['name'] }, // Including user (created by) details
        { model: QuoteItem, attributes: ['description', 'quantity', 'unit_price', 'total_price'] } // Including quote items
      ]
    });

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    return res.status(200).json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return res.status(500).json({ message: 'Error fetching quote', error: error.message });
  }
};

// Update a quote
const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { opportunityId, created_by, status, valid_until, subtotal, tax, discount, total, notes } = req.body;

    const quote = await Quote.findByPk(id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    // Update the quote details
    quote.opportunityId = opportunityId;
    quote.created_by = created_by;
    quote.status = status;
    quote.valid_until = valid_until;
    quote.subtotal = subtotal;
    quote.tax = tax;
    quote.discount = discount;
    quote.total = total;
    quote.notes = notes;

    await quote.save();

    return res.status(200).json({ message: 'Quote updated successfully', quote });
  } catch (error) {
    console.error('Error updating quote:', error);
    return res.status(500).json({ message: 'Error updating quote', error: error.message });
  }
};

// Delete a quote
const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findByPk(id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    await quote.destroy();

    return res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return res.status(500).json({ message: 'Error deleting quote', error: error.message });
  }
};

module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
