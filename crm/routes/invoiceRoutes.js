const express = require('express');
const { createInvoice, getAll, getById, updateStatus, sendInvoice, addPayment, getInvoicePayments } = require('../controllers/invoiceController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');


router.post('/invoice', auth, createInvoice)
router.get('/invoices', auth, getAll);
router.get('/invoice/:id', getById);
router.patch('/invoice/:id/status', auth, updateStatus);
router.post('/invoice/:id/send', auth, sendInvoice);
router.post('/invoice/:id/payments', auth, addPayment);
router.get('/invoice/:id/payments', auth, getInvoicePayments);

module.exports = router;
