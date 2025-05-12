// utils/auditLogger.js
const { AuditLog } = require('../models');

const logAudit = async ({
  userId,
  action,
  entity_type,
  entity_id,
  old_values = null,
  new_values = null,
  ip_address = null,
}) => {
  try {
    await AuditLog.create({
      userId,
      action,
      entity_type,
      entity_id,
      old_values: old_values ? JSON.stringify(old_values) : null,
      new_values: new_values ? JSON.stringify(new_values) : null,
      ip_address,
    });
  } catch (error) {
    console.error('Failed to log audit:', error);
  }
};

module.exports = logAudit;
