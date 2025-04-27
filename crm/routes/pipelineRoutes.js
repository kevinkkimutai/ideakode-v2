const express = require('express');
const { createPipeline, getAllPipelines, getPipelineById, updatePipeline, deletePipeline } = require('../controllers/pipelineController');
const router = express.Router();

// Create Pipeline
router.post('/pipeline', createPipeline);

// Get All Pipelines
router.get('/pipelines', getAllPipelines);

// Get Pipeline by ID
router.get('/pipelines/:id', getPipelineById);

// Update Pipeline
router.put('/pipelines/:id', updatePipeline);

// Delete Pipeline
router.delete('/pipelines/:id', deletePipeline);

module.exports = router;
