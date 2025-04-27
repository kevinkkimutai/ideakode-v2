const { ProjectTask, User, Project } = require('../models'); // Import ProjectTask model

// Create a new project task
const createProjectTask = async (req, res) => {
  try {
    const { projectId, name, description, status, priority, assigned_to, due_date, completed_at, estimated_hours, actual_hours } = req.body;

    // Create a new project task
    const projectTask = await ProjectTask.create({
      projectId,
      name,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      completed_at,
      estimated_hours,
      actual_hours
    });

    return res.status(201).json({ message: 'Project task created successfully', projectTask });
  } catch (error) {
    console.error('Error creating project task:', error);
    return res.status(500).json({ message: 'Error creating project task', error: error.message });
  }
};

// Get all project tasks
const getAllProjectTasks = async (req, res) => {
  try {
    const projectTasks = await ProjectTask.findAll({
      include: [
        { model: Project, attributes: ['name'] }, // Including project details
        { model: User, attributes: ['name'] } // Including user (assigned to) details
      ]
    });

    return res.status(200).json(projectTasks);
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    return res.status(500).json({ message: 'Error fetching project tasks', error: error.message });
  }
};

// Get a single project task by ID
const getProjectTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const projectTask = await ProjectTask.findByPk(id, {
      include: [
        { model: Project, attributes: ['name'] }, // Including project details
        { model: User, attributes: ['name'] } // Including user (assigned to) details
      ]
    });

    if (!projectTask) {
      return res.status(404).json({ message: 'Project task not found' });
    }

    return res.status(200).json(projectTask);
  } catch (error) {
    console.error('Error fetching project task:', error);
    return res.status(500).json({ message: 'Error fetching project task', error: error.message });
  }
};

// Update a project task
const updateProjectTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, name, description, status, priority, assigned_to, due_date, completed_at, estimated_hours, actual_hours } = req.body;

    const projectTask = await ProjectTask.findByPk(id);
    if (!projectTask) {
      return res.status(404).json({ message: 'Project task not found' });
    }

    // Update the project task details
    projectTask.projectId = projectId;
    projectTask.name = name;
    projectTask.description = description;
    projectTask.status = status;
    projectTask.priority = priority;
    projectTask.assigned_to = assigned_to;
    projectTask.due_date = due_date;
    projectTask.completed_at = completed_at;
    projectTask.estimated_hours = estimated_hours;
    projectTask.actual_hours = actual_hours;

    await projectTask.save();

    return res.status(200).json({ message: 'Project task updated successfully', projectTask });
  } catch (error) {
    console.error('Error updating project task:', error);
    return res.status(500).json({ message: 'Error updating project task', error: error.message });
  }
};

// Delete a project task
const deleteProjectTask = async (req, res) => {
  try {
    const { id } = req.params;

    const projectTask = await ProjectTask.findByPk(id);
    if (!projectTask) {
      return res.status(404).json({ message: 'Project task not found' });
    }

    await projectTask.destroy();

    return res.status(200).json({ message: 'Project task deleted successfully' });
  } catch (error) {
    console.error('Error deleting project task:', error);
    return res.status(500).json({ message: 'Error deleting project task', error: error.message });
  }
};

module.exports = {
  createProjectTask,
  getAllProjectTasks,
  getProjectTaskById,
  updateProjectTask,
  deleteProjectTask,
};
