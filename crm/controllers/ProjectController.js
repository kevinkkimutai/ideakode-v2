const { Project, Customer, User, Task, Contact, Address } = require('../models'); 

// Create a new project
const createProject = async (req, res) => {
  try {
    const { customerId, name, description, status, start_date, end_date, budget, managerId } = req.body;

    if (managerId) {
      const manager = await User.findByPk(managerId);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found 🥶.' });
      }
    }
    
    if (customerId) {
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found 🥶.' });
      }
    }

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
        // Customer Association
        { 
          model: Customer, 
          as: 'Customer',
          attributes: ['company_name', 'industry', 'website'],
          include: [
            { 
              model: Contact, 
              where: { is_primary: true }, 
              required: false 
            },
            { 
              model: Address, 
              where: { is_primary: true }, 
              required: false 
            }
          ]
        }, 
        // Manager Association
        { 
          model: User, 
          as: 'Manager',
          attributes: ['first_name', 'last_name', 'email'] 
        },
        // Tasks Association
        { 
          model: Task, 
          as: 'Tasks',
          include: [
            { 
              model: User, 
              as: 'Assignees', 
              attributes: ['first_name','last_name', 'email'] 
            },
            { 
              model: User, 
              as: 'Assigner', 
              attributes: ['first_name','last_name', 'email'] 
            }
          ]
        }
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
        // Customer Association
        { 
          model: Customer, 
          as: 'Customer',
          attributes: ['company_name', 'industry', 'website'],
          include: [
            { 
              model: Contact, 
              where: { is_primary: true }, 
              required: false 
            },
            { 
              model: Address, 
              where: { is_primary: true }, 
              required: false 
            }
          ]
        }, 
        // Manager Association
        { 
          model: User, 
          as: 'Manager',
          attributes: ['first_name', 'last_name', 'email'] 
        },
        // Tasks Association
        { 
          model: Task, 
          as: 'Tasks',
          include: [
            { 
              model: User, 
              as: 'Assignees', 
              attributes: ['first_name','last_name', 'email'] 
            },
            { 
              model: User, 
              as: 'Assigner', 
              attributes: ['first_name','last_name', 'email'] 
            }
          ]
        }
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

// Update a project with partial updates
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Contains only the fields that need to be updated

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Validate related entities if they're being updated
    if (updates.managerId) {
      const manager = await User.findByPk(updates.managerId);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found 🥶.' });
      }
    }
    
    if (updates.customerId) {
      const customer = await Customer.findByPk(updates.customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found 🥶.' });
      }
    }

    // Update only the provided fields
    Object.keys(updates).forEach((key) => {
      if (key in project) {
        project[key] = updates[key];
      }
    });

    await project.save();

    // Fetch the updated project with all associations
    const updatedProject = await Project.findByPk(id, {
      include: [
        // Customer Association
        { 
          model: Customer, 
          as: 'Customer',
          attributes: ['company_name', 'industry', 'website'],
          include: [
            { 
              model: Contact, 
              where: { is_primary: true }, 
              required: false 
            },
            { 
              model: Address, 
              where: { is_primary: true }, 
              required: false 
            }
          ]
        }, 
        // Manager Association
        { 
          model: User, 
          as: 'Manager',
          attributes: ['first_name', 'last_name', 'email'] 
        },
        // Tasks Association
        { 
          model: Task, 
          as: 'Tasks',
          include: [
            { 
              model: User, 
              as: 'Assignees', 
              attributes: ['first_name','last_name', 'email'] 
            },
            { 
              model: User, 
              as: 'Assigner', 
              attributes: ['first_name','last_name', 'email'] 
            }
          ]
        }
      ]
    });

    return res.status(200).json({ 
      message: 'Project updated successfully', 
      project: updatedProject 
    });
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
