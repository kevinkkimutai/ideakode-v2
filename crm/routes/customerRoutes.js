// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');
const { createCustomer, getAll, getById, update, deleteCustomer, getCustomerStats } = require('../controllers/customerController');

router.post('/customer', auth, createCustomer);
router.get('/customers', auth, getAll);
router.get('/customer/:id', auth, getById);
router.put('/customer/:id', auth, update);
router.delete('/customer/:id', deleteCustomer);
router.get('/customer/:id/stats', getCustomerStats);

module.exports = router;

