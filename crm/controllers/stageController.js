const { Stage } = require('../models'); // Import the Stage model

// Create a new stage
const createStage = async (req, res) => {
  try {
    const { pipelineId, name, probability, position } = req.body;

    // Create a new stage
    const stage = await Stage.create({
      pipelineId,
      name,
      probability,
      position
    });

    return res.status(201).json({ message: 'Stage created successfully', stage });
  } catch (error) {
    console.error('Error creating stage:', error);
    return res.status(500).json({ message: 'Error creating stage', error: error.message });
  }
};

// Get all stages
const getAllStages = async (req, res) => {
  try {
    const stages = await Stage.findAll();

    return res.status(200).json(stages);
  } catch (error) {
    console.error('Error fetching stages:', error);
    return res.status(500).json({ message: 'Error fetching stages', error: error.message });
  }
};

// Get a single stage by ID
const getStageById = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await Stage.findByPk(id);

    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    return res.status(200).json(stage);
  } catch (error) {
    console.error('Error fetching stage:', error);
    return res.status(500).json({ message: 'Error fetching stage', error: error.message });
  }
};

// Update a stage by ID
const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { pipelineId, name, probability, position } = req.body;

    const stage = await Stage.findByPk(id);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    // Update stage details
    stage.pipelineId = pipelineId;
    stage.name = name;
    stage.probability = probability;
    stage.position = position;

    await stage.save();

    return res.status(200).json({ message: 'Stage updated successfully', stage });
  } catch (error) {
    console.error('Error updating stage:', error);
    return res.status(500).json({ message: 'Error updating stage', error: error.message });
  }
};

// Delete a stage by ID
const deleteStage = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await Stage.findByPk(id);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    await stage.destroy();

    return res.status(200).json({ message: 'Stage deleted successfully' });
  } catch (error) {
    console.error('Error deleting stage:', error);
    return res.status(500).json({ message: 'Error deleting stage', error: error.message });
  }
};

module.exports = {
  createStage,
  getAllStages,
  getStageById,
  updateStage,
  deleteStage,
};
