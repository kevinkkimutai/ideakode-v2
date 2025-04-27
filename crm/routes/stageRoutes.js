const express = require('express');
const { createStage, getAllStages, getStageById, updateStage, deleteStage } = require('../controllers/stageController');
const router = express.Router();


// Create a new Stage
router.post('/stages', createStage);

// Get all stages
router.get('/stages', getAllStages);

// Get a single stage by ID
router.get('/stages/:id', getStageById);

// Update a stage by ID
router.put('/stages/:id', updateStage);

// Delete a stage by ID
router.delete('/stages/:id', deleteStage);

module.exports = router;
