// controllers/customerController.js
const { Customer, Contact, Address, Project, Ticket, Invoice, User } = require('../models');

const createCustomer = async (req, res) => {
  try {
    const creatorId = req.user.id;
    const user = await User.findByPk(creatorId)
    if (!user) return res.status(409).json({ message: 'User not found 🥶!' });
    
    const customer = await Customer.create(req.body);
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send({
      error: 'Error creating customer'
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const customers = await Customer.findAndCountAll({
      limit: parseInt(limit),
      offset,
      include: [
        { model: Contact, where: { is_primary: true }, required: false },
        { model: Address, where: { is_primary: true }, required: false }
      ]
    });

    res.send({
      data: customers.rows,
      total: customers.count,
      totalPages: Math.ceil(customers.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).send({
      error: 'Error fetching customers'
    });
  }
};

const getById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        { model: Contact },
        { model: Address },
        { model: Project },
        { model: Ticket }
      ]
    });

    if (!customer) {
      return res.status(404).send({
        error: 'Customer not found'
      });
    }

    res.send(customer);
  } catch (error) {
    res.status(500).send({
      error: 'Error fetching customer'
    });
  }
};

const update = async (req, res) => {
  try {
    await Customer.update(req.body, {
      where: { id: req.params.id }
    });
    res.send({ message: 'Customer updated successfully 🎉' });
  } catch (error) {
    res.status(500).send({
      error: 'Error updating customer'
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.destroy({
      where: { id: req.params.id }
    });
    res.send({ message: 'Customer deleted successfully 🎉' });
  } catch (error) {
    res.status(500).send({
      error: 'Error deleting customer'
    });
  }
};

const getCustomerStats = async (req, res) => {
  try {
    const customerId = req.params.id;

    const [projects, tickets, invoices] = await Promise.all([
      Project.count({ where: { customer_id: customerId } }),
      Ticket.count({ where: { customer_id: customerId } }),
      Invoice.count({ where: { customer_id: customerId } })
    ]);

    res.send({
      projects,
      tickets,
      invoices
    });
  } catch (error) {
    res.status(500).send({
      error: 'Error fetching customer statistics'
    });
  }
};

module.exports = {
  createCustomer,
  getAll,
  getById,
  update,
  deleteCustomer,
  getCustomerStats
};
