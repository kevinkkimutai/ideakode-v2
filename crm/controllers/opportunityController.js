const { Opportunity, Customer, Contact, User, Stage, Quote } = require('../models'); // Import necessary models
const logAudit = require('../utils/auditLogger');

// Create a new opportunity
const createOpportunity = async (req, res) => {
  try {
    const { customerId, contactId, assigned_to, name, description, value, probability, expected_close_date, lost_reason, stageId, closed } = req.body;
    const userId = req.user.id;
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
      closed,
      probability,
      expected_close_date,
      lost_reason,
      stageId,
      created_by: userId
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
        { model: Customer, as: 'Customer', attributes: ['id', 'company_name'] },
        { model: Contact, as: 'Contact', attributes: ['id', 'first_name', 'email'] },
        { model: User, as: 'assignee', attributes: ['id', 'first_name', 'last_name'] },
        { model: User, as: 'creator', attributes: ['id', 'first_name', 'last_name'] },
        { model: Stage, as: 'Stage', attributes: ['id', 'name'] },
        { model: Quote, as: 'Quotes', attributes: ['id', 'total'] }
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
        { model: Customer, as: 'Customer', attributes: ['id', 'company_name'] },
        { model: Contact, as: 'Contact', attributes: ['id', 'first_name', 'email'] },
        { model: User, as: 'assignee', attributes: ['id', 'first_name', 'last_name'] },
        { model: User, as: 'creator', attributes: ['id', 'first_name', 'last_name'] },
        { model: Stage, as: 'Stage', attributes: ['id', 'name'] },
        { model: Quote, as: 'Quotes', attributes: ['id', 'total'] }
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
    const {
      customerId,
      contactId,
      assigned_to,
      name,
      description,
      value,
      probability,
      expected_close_date,
      lost_reason,
      stageId,
      closed
    } = req.body;

    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Validate associated entities if IDs are provided
    if (customerId) {
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
    }

    if (contactId) {
      const contact = await Contact.findByPk(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
    }

    if (assigned_to) {
      const user = await User.findByPk(assigned_to);
      if (!user) {
        return res.status(404).json({ message: 'Assigned user not found' });
      }
    }

    if (stageId) {
      const stage = await Stage.findByPk(stageId);
      if (!stage) {
        return res.status(404).json({ message: 'Stage not found' });
      }
    }

    const oldValues = { ...opportunity.get() };

    // Update opportunity fields if provided
    Object.assign(opportunity, {
      customerId: customerId ?? opportunity.customerId,
      contactId: contactId ?? opportunity.contactId,
      assigned_to: assigned_to ?? opportunity.assigned_to,
      name: name ?? opportunity.name,
      description: description ?? opportunity.description,
      value: value ?? opportunity.value,
      probability: probability ?? opportunity.probability,
      expected_close_date: expected_close_date ?? opportunity.expected_close_date,
      lost_reason: lost_reason ?? opportunity.lost_reason,
      stageId: stageId ?? opportunity.stageId,
      closed: closed ?? opportunity.closed
    });

    await opportunity.save();

    // Audit log
    await logAudit({
      userId: req.user?.id || null,
      action: 'UPDATE',
      entity_type: 'Opportunity',
      entity_id: opportunity.id,
      old_values: JSON.stringify(oldValues),
      new_values: JSON.stringify(opportunity.get()), // not req.body for accuracy
      ip_address: req.ip
    });

    return res.status(200).json({
      message: 'Opportunity updated successfully',
      opportunity
    });
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
    const oldValues = { ...opportunity.get() };
    await opportunity.destroy();
    
    // Audit log
    await logAudit({
      userId: req.user?.id || null,
      action: 'DELETE',
      entity_type: 'Opportunity',
      entity_id: opportunity.id,
      old_values: JSON.stringify(oldValues),
      new_values: null,
      ip_address: req.ip
    });

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
