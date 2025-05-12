const { Quote, Opportunity, User, QuoteItem, Stage } = require('../models'); // Import the Quote model
const logAudit = require('../utils/auditLogger');

// Create a new quote
const createQuote = async (req, res) => {
  try {
    const { opportunityId, status, valid_until, subtotal, tax, discount, total, notes } = req.body;
    const userId = req.user.id;

const user = await User.findByPk(userId);
if (!user) {
  return res.status("User not Found 🥶.")
}
    // Create a new quote
    const quote = await Quote.create({
      opportunityId,
      created_by: userId,
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
        {
          model: Opportunity,
          attributes: ['id', 'name', 'description'],
          include: [
            {
              model: Stage,
              attributes: ['id', 'name', 'probability']
            }
          ]
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: QuoteItem,
          attributes: ['discount', 'unit_price', 'total_price']
        }
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
        {
          model: Opportunity,
          attributes: ['id', 'name', 'description'],
          include: [
            {
              model: Stage,
              attributes: ['id', 'name', 'probability']
            }
          ]
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: QuoteItem,
          attributes: ['discount', 'unit_price', 'total_price']
        }
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
    const { opportunityId, status, valid_until, subtotal, tax, discount, total, notes } = req.body;

    const quote = await Quote.findByPk(id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    const oldValues = { ...quote.get() };
    // Update the quote details
    quote.opportunityId = opportunityId;
    quote.status = status;
    quote.valid_until = valid_until;
    quote.subtotal = subtotal;
    quote.tax = tax;
    quote.discount = discount;
    quote.total = total;
    quote.notes = notes;

    await quote.save();

     // Audit log
     await logAudit({
      userId: req.user?.id || null,
      action: 'UPDATE',
      entity_type: 'Quote',
      entity_id: quote.id,
      old_values: JSON.stringify(oldValues),
      new_values: JSON.stringify(quote.get()),
      ip_address: req.ip
    });

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
    const oldValues = { ...quote.get() };
    
    await quote.destroy();

        // Audit log
        await logAudit({
          userId: req.user?.id || null,
          action: 'DELETE',
          entity_type: 'Quote',
          entity_id: quote.id,
          old_values: JSON.stringify(oldValues),
          new_values: null,
          ip_address: req.ip
        });

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
