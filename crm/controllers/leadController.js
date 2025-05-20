const { Lead, User } = require('../models');

// Create a new lead
const createLead = async (req, res) => {
  try {
    const { sourceId, assigned_to, first_name, last_name, company_name, email, phone, status, score } = req.body;

    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found 🥶." });
    }

    const lead = await Lead.create({
      sourceId,
      assigned_to,
      created_by: userId,
      date_created: new Date(),
      first_name,
      last_name,
      company_name,
      email,
      phone,
      status,
      score,
    });

    return res.status(201).json({ message: 'Lead created successfully', lead });
  } catch (error) {
    console.error('Error creating lead:', error);
    return res.status(500).json({ message: 'Error creating lead', error: error.message });
  }
};

// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        },
        {
          model: User,
          as: 'createdByUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        }
      ]
    });
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

// Get leads by created_by user
const getLeadsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const leads = await Lead.findAll({
      where: { created_by: userId },
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        }
      ]
    });
    
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching user leads:', error);
    return res.status(500).json({ message: 'Error fetching user leads', error: error.message });
  }
};


// Get leads by assingned to user
const getLeadsAssignedTo = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const leads = await Lead.findAll({
      where: { assigned_to: userId },
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        },
        {
          model: User,
          as: 'createdByUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        }
      ]
    });
    
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching user leads:', error);
    return res.status(500).json({ message: 'Error fetching user leads', error: error.message });
  }
};

// Get a lead by ID
const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        },
        {
          model: User,
          as: 'createdByUser',
          attributes: ['id', 'first_name', 'last_name', 'email']
        }
      ]
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    return res.status(200).json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return res.status(500).json({ message: 'Error fetching lead', error: error.message });
  }
};

// Update a lead
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { sourceId, assigned_to, first_name, last_name, company_name, email, phone, status, score } = req.body;

    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if the user has permission to update this lead
    const userId = req.user.id;
    if (lead.created_by !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this lead' });
    }

    lead.sourceId = sourceId || lead.sourceId;
    lead.assigned_to = assigned_to || lead.assigned_to;
    lead.first_name = first_name || lead.first_name;
    lead.last_name = last_name || lead.last_name;
    lead.company_name = company_name || lead.company_name;
    lead.email = email || lead.email;
    lead.phone = phone || lead.phone;
    lead.status = status || lead.status;
    lead.score = score !== undefined ? score : lead.score;
    lead.updated_at = new Date(); // Update the updated_at timestamp

    await lead.save();

    return res.status(200).json({ message: 'Lead updated successfully', lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    return res.status(500).json({ message: 'Error updating lead', error: error.message });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if the user has permission to delete this lead
    const userId = req.user.id;
    if (lead.created_by !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this lead' });
    }

    await lead.destroy();
    return res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadsByUser,
  getLeadsAssignedTo,
  getLeadById,
  updateLead,
  deleteLead,
};