const express = require('express');
const { createStage, getAllStages, getStageById, updateStage, deleteStage } = require('../controllers/stageController');
const router = express.Router();


// Create a new Stage
router.post('/stage', createStage);

// Get all stages
router.get('/stages', getAllStages);

// Get a single stage by ID
router.get('/stage/:id', getStageById);

// Update a stage by ID
router.put('/stage/:id', updateStage);

// Delete a stage by ID
router.delete('/stage/:id', deleteStage);

module.exports = router;
