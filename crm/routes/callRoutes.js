const express = require('express');
const { createCall, getAllCalls, getCallById, getCallsByUser, getCallsByRelatedEntity, deleteCall } = require('../controllers/callcontroller');
const router = express.Router();

// Create a new call record
router.post('/call', createCall);
router.get('/calls', getAllCalls);
router.get('/call/:id', getCallById);
router.get('/calls/user/:userId', getCallsByUser);
router.get('/call/related/:entityType/:entityId', getCallsByRelatedEntity);
router.delete('/call/:id', deleteCall);

module.exports = router;
