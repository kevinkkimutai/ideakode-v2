const { Opportunity, Customer, Contact, User, Stage, Quote } = require('../models'); // Import necessary models

// Create a new opportunity
const createOpportunity = async (req, res) => {
  try {
    const { customerId, contactId, assigned_to, name, description, value, probability, expected_close_date, lost_reason, stageId } = req.body;

    // Check if associated customer, contact, user, and stage exist
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const user = await User.findByPk(assigned_to);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stage = await Stage.findByPk(stageId);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    // Create a new opportunity
    const opportunity = await Opportunity.create({
      customerId,
      contactId,
      assigned_to,
      name,
      description,
      value,
      probability,
      expected_close_date,
      lost_reason,
      stageId
    });

    return res.status(201).json({ message: 'Opportunity created successfully', opportunity });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return res.status(500).json({ message: 'Error creating opportunity', error: error.message });
  }
};

// Get all opportunities
const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.findAll({
      include: [
        { model: Customer, as: 'customer', attributes: ['id', 'name'] },
        { model: Contact, as: 'contact', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'assigned_to', attributes: ['id', 'first_name', 'last_name'] },
        { model: Stage, as: 'stage', attributes: ['id', 'name'] },
        { model: Quote, as: 'quotes', attributes: ['id', 'amount'] }
      ]
    });

    return res.status(200).json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return res.status(500).json({ message: 'Error fetching opportunities', error: error.message });
  }
};

// Get a single opportunity by ID
const getOpportunityById = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findByPk(id, {
      include: [
        { model: Customer, as: 'customer', attributes: ['id', 'name'] },
        { model: Contact, as: 'contact', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'assigned_to', attributes: ['id', 'first_name', 'last_name'] },
        { model: Stage, as: 'stage', attributes: ['id', 'name'] },
        { model: Quote, as: 'quotes', attributes: ['id', 'amount'] }
      ]
    });

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    return res.status(200).json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return res.status(500).json({ message: 'Error fetching opportunity', error: error.message });
  }
};

// Update an opportunity
const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, contactId, assigned_to, name, description, value, probability, expected_close_date, lost_reason, stageId } = req.body;

    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check if associated customer, contact, user, and stage exist
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const user = await User.findByPk(assigned_to);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stage = await Stage.findByPk(stageId);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    // Update opportunity details
    opportunity.customerId = customerId;
    opportunity.contactId = contactId;
    opportunity.assigned_to = assigned_to;
    opportunity.name = name;
    opportunity.description = description;
    opportunity.value = value;
    opportunity.probability = probability;
    opportunity.expected_close_date = expected_close_date;
    opportunity.lost_reason = lost_reason;
    opportunity.stageId = stageId;

    await opportunity.save();

    return res.status(200).json({ message: 'Opportunity updated successfully', opportunity });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    return res.status(500).json({ message: 'Error updating opportunity', error: error.message });
  }
};

// Delete an opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    await opportunity.destroy();

    return res.status(200).json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    return res.status(500).json({ message: 'Error deleting opportunity', error: error.message });
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};
