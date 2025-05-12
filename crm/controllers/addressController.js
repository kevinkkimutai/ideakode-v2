const { Address, Customer } = require('../models');

const createAddress = async (req, res) => {
  const {
    customerId,
    address_type,
    street,
    city,
    state,
    postal_code,
    country,
    is_primary = false
  } = req.body;



  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const address = await Address.create({
      customerId,
      address_type,
      street,
      city,
      state,
      postal_code,
      country,
      is_primary
    });

    res.status(201).json(address);
  } catch (error) {
    console.error('Address creation error:', error);
    res.status(500).json({ error: 'Error creating address' });
  }
};


const getAll = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [{ model: Customer }]
    });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching addresses' });
  }
};

const getById = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id, {
      include: [{ model: Customer }]
    });
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching address' });
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });

    await address.update(req.body);
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Error updating address' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });

    await address.destroy();
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting address' });
  }
};

module.exports = {
  createAddress,
  getAll,
  getById,
  updateAddress,
  deleteAddress
};
