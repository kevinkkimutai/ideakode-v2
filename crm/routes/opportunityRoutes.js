const express = require('express');
const { createOpportunity, getAllOpportunities, getOpportunityById, updateOpportunity, deleteOpportunity } = require('../controllers/opportunityController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');

// Create Opportunity
router.post('/opportunity', auth, createOpportunity);

// Get All Opportunities
router.get('/opportunities', getAllOpportunities);

// Get Opportunity by ID
router.get('/opportunity/:id', getOpportunityById);

// Update Opportunity
router.put('/opportunity/:id', auth, updateOpportunity);

// Delete Opportunity
router.delete('/opportunity/:id', auth, deleteOpportunity);

module.exports = router;
