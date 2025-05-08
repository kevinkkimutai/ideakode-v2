const { ProjectTask, User, Project } = require('../models');

// Create a new project task
const createProjectTask = async (req, res) => {
  const userId = req.user.id;
  try {
    const {
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
    } = req.body;

    const projectTask = await ProjectTask.create({
      projectId,
      name,
      description,
      status,
      priority,
      assigned_by: userId,
      due_date,
      completed_at,
      estimated_hours,
      actual_hours
    });

    // Validate assignees
    if (Array.isArray(assigned_to)) {
      const assignees = await User.findAll({ where: { id: assigned_to } });

      if (assignees.length !== assigned_to.length) {
        return res.status(400).json({ message: 'One or more assignee IDs are invalid' });
      }

      await projectTask.setAssignees(assigned_to); // Sequelize magic method
    }

    const fullTask = await ProjectTask.findByPk(projectTask.id, {
      include: [{ model: User, as: 'Assignees', attributes: ['id', 'first_name', 'last_name'] }]
    });

    return res.status(201).json({ message: 'Project task created successfully', projectTask: fullTask });
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
        { model: Project, attributes: ['name'] },
        { model: User, as: 'Assignees', attributes: ['first_name','last_name', 'email'] },
        { model: User, as: 'Assigner', attributes: ['first_name','last_name', 'email'] }
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
        { model: Project, attributes: ['name'] },
        { model: User, as: 'Assignees', attributes: ['first_name','last_name', 'email'] },
        { model: User, as: 'Assigner', attributes: ['first_name','last_name', 'email'] }
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

const assignUsersToTask = async (req, res) => {
  try {
    const {taskId}  = req.params;
    const { userIds } = req.body; 

    const projectTask = await ProjectTask.findByPk(taskId);
    if (!projectTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const validUsers = await User.findAll({ where: { id: userIds } });
    if (validUsers.length !== userIds.length) {
      return res.status(400).json({ message: 'Some users not found' });
    }

    await projectTask.setAssignees(userIds);

    return res.status(200).json({ message: 'Users assigned successfully to the task' });
  } catch (error) {
    console.error('Error assigning users to task:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getMyProjectTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await ProjectTask.findAll({
      include: [
        {
          model: User,
          as: 'Assignees',
          where: { id: userId },
          attributes: [],
          through: { attributes: [] }
        },
        { model: Project, attributes: ['name'] },
        { model: User, as: 'Assigner', attributes: ['first_name', 'last_name', 'email'] }
      ]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    return res.status(500).json({ message: 'Error fetching user tasks', error: error.message });
  }
};


// Update a project task
const updateProjectTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      projectId,
      name,
      description,
      status,
      priority,
      due_date,
      completed_at,
      estimated_hours,
      actual_hours
    } = req.body;

    const projectTask = await ProjectTask.findByPk(id);
    if (!projectTask) {
      return res.status(404).json({ message: 'Project task not found' });
    }

    // Only the user who created the task (assigned_by) can update it
    const userId = req.user.id;
    if (userId !== projectTask.assigned_by) {
      return res.status(403).json({ message: 'You are not authorized to update this task' });
    }

    // Update allowed fields
    Object.assign(projectTask, {
      projectId,
      name,
      description,
      status,
      priority,
      due_date,
      completed_at,
      estimated_hours,
      actual_hours
    });

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
  assignUsersToTask,
  getMyProjectTasks,
  updateProjectTask,
  deleteProjectTask,
};
