const { TaxRate } = require('../models'); // Import the TaxRate model

// Create a new tax rate
const createTaxRate = async (req, res) => {
  try {
    const { name, rate, description, is_active } = req.body;

    // Create a new tax rate
    const taxRate = await TaxRate.create({
      name,
      rate,
      description,
      is_active
    });

    return res.status(201).json({ message: 'Tax rate created successfully', taxRate });
  } catch (error) {
    console.error('Error creating tax rate:', error);
    return res.status(500).json({ message: 'Error creating tax rate', error: error.message });
  }
};

// Get all tax rates
const getAllTaxRates = async (req, res) => {
  try {
    const taxRates = await TaxRate.findAll();

    return res.status(200).json(taxRates);
  } catch (error) {
    console.error('Error fetching tax rates:', error);
    return res.status(500).json({ message: 'Error fetching tax rates', error: error.message });
  }
};

// Get a single tax rate by ID
const getTaxRateById = async (req, res) => {
  try {
    const { id } = req.params;

    const taxRate = await TaxRate.findByPk(id);

    if (!taxRate) {
      return res.status(404).json({ message: 'Tax rate not found' });
    }

    return res.status(200).json(taxRate);
  } catch (error) {
    console.error('Error fetching tax rate:', error);
    return res.status(500).json({ message: 'Error fetching tax rate', error: error.message });
  }
};

// Update a tax rate by ID
const updateTaxRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rate, description, is_active } = req.body;

    const taxRate = await TaxRate.findByPk(id);
    if (!taxRate) {
      return res.status(404).json({ message: 'Tax rate not found' });
    }

    // Update tax rate details
    taxRate.name = name;
    taxRate.rate = rate;
    taxRate.description = description;
    taxRate.is_active = is_active;

    await taxRate.save();

    return res.status(200).json({ message: 'Tax rate updated successfully', taxRate });
  } catch (error) {
    console.error('Error updating tax rate:', error);
    return res.status(500).json({ message: 'Error updating tax rate', error: error.message });
  }
};

// Delete a tax rate by ID
const deleteTaxRate = async (req, res) => {
  try {
    const { id } = req.params;

    const taxRate = await TaxRate.findByPk(id);
    if (!taxRate) {
      return res.status(404).json({ message: 'Tax rate not found' });
    }

    await taxRate.destroy();

    return res.status(200).json({ message: 'Tax rate deleted successfully' });
  } catch (error) {
    console.error('Error deleting tax rate:', error);
    return res.status(500).json({ message: 'Error deleting tax rate', error: error.message });
  }
};

module.exports = {
  createTaxRate,
  getAllTaxRates,
  getTaxRateById,
  updateTaxRate,
  deleteTaxRate,
};
