const { Call, User, Contact } = require('../models');

// Create a new call record
const createCall = async (req, res) => {
  try {
    const call = await Call.create(req.body);
    res.status(201).json(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating call record' });
  }
};

// Get all call records
const getAllCalls = async (req, res) => {
  try {
    const calls = await Call.findAll({
      include: [
        { model: User, as: 'MadeBy', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'CallWith', attributes: ['id', 'name', 'phone_number'] }
      ]
    });
    res.json(calls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calls' });
  }
};

// Get a call record by ID
const getCallById = async (req, res) => {
  try {
    const call = await Call.findByPk(req.params.id, {
      include: [
        { model: User, as: 'MadeBy', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'CallWith', attributes: ['id', 'name', 'phone_number'] }
      ]
    });
    if (!call) return res.status(404).json({ error: 'Call record not found' });
    res.json(call);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching call record' });
  }
};

// Get calls made by a specific user
const getCallsByUser = async (req, res) => {
  try {
    const calls = await Call.findAll({
      where: { made_by: req.params.userId },
      include: [
        { model: User, as: 'MadeBy', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'CallWith', attributes: ['id', 'name', 'phone_number'] }
      ]
    });
    res.json(calls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calls by user' });
  }
};

// Get calls related to a specific entity (e.g., a customer or order)
const getCallsByRelatedEntity = async (req, res) => {
  try {
    const calls = await Call.findAll({
      where: { related_to: req.params.entityType, related_id: req.params.entityId },
      include: [
        { model: User, as: 'MadeBy', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'CallWith', attributes: ['id', 'name', 'phone_number'] }
      ]
    });
    res.json(calls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calls related to the entity' });
  }
};

// Delete a call record by ID
const deleteCall = async (req, res) => {
  try {
    const call = await Call.findByPk(req.params.id);
    if (!call) return res.status(404).json({ error: 'Call record not found' });

    await call.destroy();
    res.json({ message: 'Call record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting call record' });
  }
};

module.exports = {
  createCall,
  getAllCalls,
  getCallById,
  getCallsByUser,
  getCallsByRelatedEntity,
  deleteCall
};
