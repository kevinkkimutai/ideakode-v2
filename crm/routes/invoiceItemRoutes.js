const express = require('express');
const { createInvoiceItem, getInvoiceItems, getInvoiceItemById, updateInvoiceItem, deleteInvoiceItem } = require('../controllers/InvoiceItemController');
const router = express.Router();


router.post('/invoice-item', createInvoiceItem); 
router.get('/invoice-items', getInvoiceItems); 
router.get('/invoice-items/:id', getInvoiceItemById); 
router.put('/invoice-items/:id', updateInvoiceItem); 
router.delete('/invoice-items/:id', deleteInvoiceItem); 

module.exports = router;
