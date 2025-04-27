const express = require('express');
const { createAuditLog, getAll, getById, getByUserId, deleteAuditLog } = require('../controllers/auditLogController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');

router.post('/auditlog', auth, createAuditLog);
router.get('/auditlogs', getAll);
router.get('/auditlog/:id', getById);
router.get('/auditlog/user/:userId', auth, getByUserId);
router.delete('/auditlog/:id', deleteAuditLog);

module.exports = router;
