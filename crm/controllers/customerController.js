// controllers/customerController.js
const { Customer, Contact, Address, Project, Ticket, Invoice, User } = require('../models');
const logAudit = require('../utils/auditLogger');

const createCustomer = async (req, res) => {
  try {
    const creatorId = req.user.id;

    // Validate user
    const user = await User.findByPk(creatorId);
    if (!user) return res.status(404).json({ message: 'User not found 🥶!' });

    // Inject created_by into the request body
    const customerData = {
      ...req.body,
      created_by: creatorId,
    };

    const customer = await Customer.create(customerData);

    res.status(201).json({
      message: 'Customer created successfully',
      customer,
    });
  } catch (error) {
    console.error("Customer creation error:", error);
    res.status(500).json({
      message: 'Error creating customer',
      error: error.message,
    });
  }
};



const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const customers = await Customer.findAndCountAll({
      limit: parseInt(limit),
      offset,
      include: [
        { model: Contact, where: { is_primary: true }, required: false },
        { model: Address, where: { is_primary: true }, required: false },
        { model: Project, as: 'Projects', required: false }
      ]
    });

    res.send({
      customers: customers.rows,
      total: customers.count,
      totalPages: Math.ceil(customers.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Customer fetch error:', error); // Add this line
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
        { model: Project, as: 'Projects', required: false },
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
    const id = req.params.id;
    const oldCustomer = await Customer.findByPk(id);
    if (!oldCustomer) return res.status(404).json({ error: 'Customer not found' });

    await oldCustomer.update(req.body);

    // Call audit logger
    await logAudit({
      userId: req.user.id,
      action: 'UPDATE',
      entity_type: 'Customer',
      entity_id: id,
      old_values: oldCustomer.toJSON(),
      new_values: req.body,
      ip_address: req.ip,
    });

    res.status(200).json(oldCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update customer' });
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
