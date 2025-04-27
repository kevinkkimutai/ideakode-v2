const { Pipeline } = require('../models'); // Import Pipeline model

// Create a new pipeline
const createPipeline = async (req, res) => {
  try {
    const { name, is_default } = req.body;

    // Create a new pipeline
    const pipeline = await Pipeline.create({
      name,
      is_default
    });

    return res.status(201).json({ message: 'Pipeline created successfully', pipeline });
  } catch (error) {
    console.error('Error creating pipeline:', error);
    return res.status(500).json({ message: 'Error creating pipeline', error: error.message });
  }
};

// Get all pipelines
const getAllPipelines = async (req, res) => {
  try {
    const pipelines = await Pipeline.findAll();

    return res.status(200).json(pipelines);
  } catch (error) {
    console.error('Error fetching pipelines:', error);
    return res.status(500).json({ message: 'Error fetching pipelines', error: error.message });
  }
};

// Get a single pipeline by ID
const getPipelineById = async (req, res) => {
  try {
    const { id } = req.params;

    const pipeline = await Pipeline.findByPk(id);
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    return res.status(200).json(pipeline);
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    return res.status(500).json({ message: 'Error fetching pipeline', error: error.message });
  }
};

// Update a pipeline
const updatePipeline = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_default } = req.body;

    const pipeline = await Pipeline.findByPk(id);
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    // Update the pipeline details
    pipeline.name = name;
    pipeline.is_default = is_default;

    await pipeline.save();

    return res.status(200).json({ message: 'Pipeline updated successfully', pipeline });
  } catch (error) {
    console.error('Error updating pipeline:', error);
    return res.status(500).json({ message: 'Error updating pipeline', error: error.message });
  }
};

// Delete a pipeline
const deletePipeline = async (req, res) => {
  try {
    const { id } = req.params;

    const pipeline = await Pipeline.findByPk(id);
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    await pipeline.destroy();

    return res.status(200).json({ message: 'Pipeline deleted successfully' });
  } catch (error) {
    console.error('Error deleting pipeline:', error);
    return res.status(500).json({ message: 'Error deleting pipeline', error: error.message });
  }
};

module.exports = {
  createPipeline,
  getAllPipelines,
  getPipelineById,
  updatePipeline,
  deletePipeline,
};
