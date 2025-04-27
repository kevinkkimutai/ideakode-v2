const express = require('express');
const { createOpportunity, getAllOpportunities, getOpportunityById, updateOpportunity, deleteOpportunity } = require('../controllers/opportunityController');
const router = express.Router();


// Create Opportunity
router.post('/opportunity', createOpportunity);

// Get All Opportunities
router.get('/opportunities', getAllOpportunities);

// Get Opportunity by ID
router.get('/opportunities/:id', getOpportunityById);

// Update Opportunity
router.put('/opportunities/:id', updateOpportunity);

// Delete Opportunity
router.delete('/opportunities/:id', deleteOpportunity);

module.exports = router;
