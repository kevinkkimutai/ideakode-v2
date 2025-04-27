const { AuditLog, User } = require('../models');

// Create a new audit log entry
const createAuditLog = async (req, res) => {
  try {
    const id = req.user.id;
    const auditLog = await AuditLog.create(req.body, id);
    res.status(201).json(auditLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating audit log' });
  }
};

// Get all audit logs
const getAll = async (req, res) => {
  try {
    const auditLogs = await AuditLog.findAll({
      include: [{ model: User }]
    });
    res.json(auditLogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit logs' });
  }
};

// Get an audit log by ID
const getById = async (req, res) => {
  try {
    const auditLog = await AuditLog.findByPk(req.params.id, {
      include: [{ model: User }]
    });
    if (!auditLog) return res.status(404).json({ error: 'Audit log not found' });
    res.json(auditLog);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit log' });
  }
};

// Get audit logs by userId
const getByUserId = async (req, res) => {
  try {
    const auditLogs = await AuditLog.findAll({
      where: { userId: req.params.userId },
      include: [{ model: User }]
    });
    if (auditLogs.length === 0) {
      return res.status(404).json({ error: 'No audit logs found for this user' });
    }
    res.json(auditLogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit logs by user' });
  }
};

// Delete an audit log by ID
const deleteAuditLog = async (req, res) => {
  try {
    const auditLog = await AuditLog.findByPk(req.params.id);
    if (!auditLog) return res.status(404).json({ error: 'Audit log not found' });

    await auditLog.destroy();
    res.json({ message: 'Audit log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting audit log' });
  }
};

module.exports = {
  createAuditLog,
  getAll,
  getById,
  getByUserId,
  deleteAuditLog
};
