const express = require('express');
const { createTaxRate, getAllTaxRates, getTaxRateById, updateTaxRate, deleteTaxRate } = require('../controllers/taxRateController');
const router = express.Router();


// Create a new TaxRate
router.post('/taxRates', createTaxRate);

// Get all tax rates
router.get('/taxRates', getAllTaxRates);

// Get a single tax rate by ID
router.get('/taxRates/:id', getTaxRateById);

// Update a tax rate by ID
router.put('/taxRates/:id', updateTaxRate);

// Delete a tax rate by ID
router.delete('/taxRates/:id', deleteTaxRate);

module.exports = router;
