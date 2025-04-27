const { PaymentMethod } = require('../models'); // Import PaymentMethod model

// Create a new payment method
const createPaymentMethod = async (req, res) => {
  try {
    const { name, description, is_active, account_details } = req.body;

    // Create a new payment method
    const paymentMethod = await PaymentMethod.create({
      name,
      description,
      is_active,
      account_details
    });

    return res.status(201).json({ message: 'Payment Method created successfully', paymentMethod });
  } catch (error) {
    console.error('Error creating payment method:', error);
    return res.status(500).json({ message: 'Error creating payment method', error: error.message });
  }
};

// Get all payment methods
const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();

    return res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return res.status(500).json({ message: 'Error fetching payment methods', error: error.message });
  }
};

// Get a single payment method by ID
const getPaymentMethodById = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    return res.status(200).json(paymentMethod);
  } catch (error) {
    console.error('Error fetching payment method:', error);
    return res.status(500).json({ message: 'Error fetching payment method', error: error.message });
  }
};

// Update a payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, is_active, account_details } = req.body;

    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    // Update the payment method details
    paymentMethod.name = name;
    paymentMethod.description = description;
    paymentMethod.is_active = is_active;
    paymentMethod.account_details = account_details;

    await paymentMethod.save();

    return res.status(200).json({ message: 'Payment method updated successfully', paymentMethod });
  } catch (error) {
    console.error('Error updating payment method:', error);
    return res.status(500).json({ message: 'Error updating payment method', error: error.message });
  }
};

// Delete a payment method
const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    await paymentMethod.destroy();

    return res.status(200).json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment method:', error);
    return res.status(500).json({ message: 'Error deleting payment method', error: error.message });
  }
};

module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
};
