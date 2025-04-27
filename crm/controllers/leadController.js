const { Lead } = require('../models');

// Create a new lead
const createLead = async (req, res) => {
  try {
    const { sourceId, assigned_to, first_name, last_name, company_name, email, phone, status, score } = req.body;

    const lead = await Lead.create({
      sourceId,
      assigned_to,
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
    const leads = await Lead.findAll();
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

// Get a lead by ID
const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

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

    lead.sourceId = sourceId;
    lead.assigned_to = assigned_to;
    lead.first_name = first_name;
    lead.last_name = last_name;
    lead.company_name = company_name;
    lead.email = email;
    lead.phone = phone;
    lead.status = status;
    lead.score = score;

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
  getLeadById,
  updateLead,
  deleteLead,
};
