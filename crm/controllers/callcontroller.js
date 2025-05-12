const { Call, User, Contact } = require('../models');

// Helper to format a call response
const formatCallResponse = (call) => ({
  id: call.id,
  related: {
    type: call.related_to,
    id: call.related_id
  },
  participants: {
    made_by: {
      id: call.User?.id,
      name: `${call.User?.first_name} ${call.User?.last_name}`
    },
    call_with: {
      id: call.Contact?.id,
      name: `${call.Contact?.first_name} ${call.Contact?.last_name}`,
      phone: call.Contact?.phone
    }
  },
  details: {
    direction: call.direction,
    start_time: call.start_time,
    end_time: call.end_time,
    duration_seconds: call.duration,
    notes: call.notes,
    recording_url: call.recording_path
  }
});

// Create a new call record
const createCall = async (req, res) => {
  try {
    const call = await Call.create(req.body);
    const populated = await Call.findByPk(call.id, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, attributes: ['id', 'first_name', 'last_name', 'phone'] }
      ]
    });
    res.status(201).json({ success: true, call: formatCallResponse(populated) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error creating call record' });
  }
};

// Get all call records
const getAllCalls = async (req, res) => {
  try {
    const calls = await Call.findAll({
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, attributes: ['id', 'first_name', 'last_name', 'phone'] }
      ]
    });
    const formattedCalls = calls.map(formatCallResponse);
    res.json({ success: true, calls: formattedCalls });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching calls' });
  }
};

// Get a call record by ID
const getCallById = async (req, res) => {
  try {
    const call = await Call.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, attributes: ['id', 'first_name', 'last_name', 'phone'] }
      ]
    });
    if (!call) return res.status(404).json({ success: false, error: 'Call record not found' });
    res.json({ success: true, call: formatCallResponse(call) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching call record' });
  }
};

// Get calls made by a specific user
const getCallsByUser = async (req, res) => {
  try {
    const calls = await Call.findAll({
      where: { made_by: req.params.userId },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, attributes: ['id', 'first_name', 'last_name', 'phone'] }
      ]
    });
    const formattedCalls = calls.map(formatCallResponse);
    res.json({ success: true, calls: formattedCalls });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching calls by user' });
  }
};

// Get calls related to a specific entity
const getCallsByRelatedEntity = async (req, res) => {
  try {
    const calls = await Call.findAll({
      where: { related_to: req.params.entityType, related_id: req.params.entityId },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, attributes: ['id', 'first_name', 'last_name', 'phone'] }
      ]
    });
    const formattedCalls = calls.map(formatCallResponse);
    res.json({ success: true, calls: formattedCalls });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching calls related to the entity' });
  }
};

// Delete a call record by ID
const deleteCall = async (req, res) => {
  try {
    const call = await Call.findByPk(req.params.id);
    if (!call) return res.status(404).json({ success: false, error: 'Call record not found' });

    await call.destroy();
    res.json({ success: true, message: 'Call record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting call record' });
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
