const express = require('express');
const { createPaymentMethod, getAllPaymentMethods, getPaymentMethodById, updatePaymentMethod, deletePaymentMethod } = require('../controllers/paymentMethodController');
const router = express.Router();


// Create Payment Method
router.post('/payment-method', createPaymentMethod);

// Get All Payment Methods
router.get('/payment-methods', getAllPaymentMethods);

// Get Payment Method by ID
router.get('/payment-method/:id', getPaymentMethodById);

// Update Payment Method
router.put('/payment-method/:id', updatePaymentMethod);

// Delete Payment Method
router.delete('/payment-method/:id', deletePaymentMethod);

module.exports = router;
