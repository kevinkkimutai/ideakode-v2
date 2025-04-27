const { Role, User } = require('../models');

// Create new role
const createRole = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;

    const role = await Role.create({ role_name, permissions });

    res.status(201).send(role);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error creating role' });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }]
    });

    res.send(roles);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching roles' });
  }
};

// Get role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }]
    });

    if (!role) return res.status(404).send({ error: 'Role not found' });

    res.send(role);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching role' });
  }
};

// Update role
const updateRole = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;

    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).send({ error: 'Role not found' });

    await role.update({ role_name, permissions });

    res.send({ message: 'Role updated successfully', role });
  } catch (error) {
    res.status(500).send({ error: 'Error updating role' });
  }
};

// Delete role
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).send({ error: 'Role not found' });

    await role.destroy();

    res.send({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting role' });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
