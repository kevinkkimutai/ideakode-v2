const { Task, User, Product } = require('../models');

// Create a new product task
const createProductTask = async (req, res) => {
    const userId = req.user.id;
    try {
      const {
        taskableId,
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
  
      const task = await Task.create({
        taskableId,
        taskableType: "Product",
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
  
        await task.setAssignees(assigned_to);
      }

  
      const fullTask = await Task.findByPk(task.id, {
        include: [
        { model: User, as: 'Assignees', attributes: ['id', 'first_name', 'last_name'] },
        { model: User, as: 'Assigner', attributes: ['id', 'first_name', 'last_name'] }
    ]
      });
  
      return res.status(201).json({ message: 'Task created successfully', task: fullTask });
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ message: 'Error creating task', error: error.message });
    }
  };
  

// Get all product tasks
const getAllProductTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: Product, as: 'Product'},
        { model: User, as: 'Assignees', attributes: ['first_name','last_name', 'email'] },
        { model: User, as: 'Assigner', attributes: ['first_name','last_name', 'email'] }
      ]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching product tasks:', error);
    return res.status(500).json({ message: 'Error fetching product tasks', error: error.message });
  }
};

// Get a single product task by ID
const getProductTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        { model: Product, as: 'Product'},
         { model: User, as: 'Assignees', attributes: ['id', 'first_name', 'last_name'] },
        { model: User, as: 'Assigner', attributes: ['id', 'first_name', 'last_name'] }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Product task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching product task:', error);
    return res.status(500).json({ message: 'Error fetching product task', error: error.message });
  }
};

const assignUsersToProductTask = async (req, res) => {
  try {
    const {taskId}  = req.params;
    const { userIds } = req.body; 

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const validUsers = await User.findAll({ where: { id: userIds } });
    if (validUsers.length !== userIds.length) {
      return res.status(400).json({ message: 'Some users not found' });
    }

    await task.setAssignees(userIds);

    return res.status(200).json({ message: 'Users assigned successfully to the task' });
  } catch (error) {
    console.error('Error assigning users to task:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getMyProductTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: 'Assignees',
          where: { id: userId },
          attributes: [],
          through: { attributes: [] }
        },
        { model: Product, attributes: ['name'] },
        { model: User, as: 'Assigner', attributes: ['first_name', 'last_name', 'email'] }
      ]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    return res.status(500).json({ message: 'Error fetching user tasks', error: error.message });
  }
};


// Update a product task
const updateProductTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;


    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Product task not found' });
    }

    // Only the user who created the task (assigned_by) can update it
    const userId = req.user.id;
    
    if (userId !== task.assigned_by) {
      return res.status(403).json({ message: 'You are not authorized to update this task' });
    }

    // Update only the provided fields
    Object.keys(updates).forEach((key) => {
      if (key in task) {
        task[key] = updates[key];
      }
    });

    await task.save();

    return res.status(200).json({ message: 'Product task updated successfully', task });
  } catch (error) {
    console.error('Error updating product task:', error);
    return res.status(500).json({ message: 'Error updating product task', error: error.message });
  }
};



// Delete a product task
const deleteProductTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Product task not found' });
    }

    await task.destroy();

    return res.status(200).json({ message: 'Product task deleted successfully' });
  } catch (error) {
    console.error('Error deleting product task:', error);
    return res.status(500).json({ message: 'Error deleting product task', error: error.message });
  }
};

module.exports = {
  createProductTask,
  getAllProductTasks,
  getProductTaskById,
  assignUsersToProductTask,
  getMyProductTasks,
  updateProductTask,
  deleteProductTask,
};
