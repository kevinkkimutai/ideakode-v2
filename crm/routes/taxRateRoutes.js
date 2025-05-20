const express = require('express');
const { createTaxRate, getAllTaxRates, getTaxRateById, updateTaxRate, deleteTaxRate } = require('../controllers/taxRateController');
const router = express.Router();


// Create a new TaxRate
router.post('/taxRate', createTaxRate);

// Get all tax rates
router.get('/taxRates', getAllTaxRates);

// Get a single tax rate by ID
router.get('/taxRate/:id', getTaxRateById);

// Update a tax rate by ID
router.put('/taxRate/:id', updateTaxRate);

// Delete a tax rate by ID
router.delete('/taxRate/:id', deleteTaxRate);

module.exports = router;
