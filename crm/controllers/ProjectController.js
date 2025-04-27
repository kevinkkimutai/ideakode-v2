const { Project } = require('../models'); // Import Project model

// Create a new project
const createProject = async (req, res) => {
  try {
    const { customerId, name, description, status, start_date, end_date, budget, managerId } = req.body;

    // Create a new project
    const project = await Project.create({
      customerId,
      name,
      description,
      status,
      start_date,
      end_date,
      budget,
      managerId
    });

    return res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: Customer, attributes: ['name'] }, // Including customer details
        { model: User, attributes: ['name'] }, // Including manager details
        { model: ProjectTask, attributes: ['task_name'] } // Including related tasks
      ]
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        { model: Customer, attributes: ['name'] }, // Including customer details
        { model: User, attributes: ['name'] }, // Including manager details
        { model: ProjectTask, attributes: ['task_name'] } // Including related tasks
      ]
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, name, description, status, start_date, end_date, budget, managerId } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project details
    project.customerId = customerId;
    project.name = name;
    project.description = description;
    project.status = status;
    project.start_date = start_date;
    project.end_date = end_date;
    project.budget = budget;
    project.managerId = managerId;

    await project.save();

    return res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
