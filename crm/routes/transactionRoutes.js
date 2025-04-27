const express = require('express');
const { getAll, getById, updateStatus } = require('../controllers/transactionController');
const router = express.Router();


// GET all transactions with filters
router.get('/transactions', getAll);
router.get('/transaction/:id', getById);
router.patch('/transaction/:id/status', updateStatus);

module.exports = router;
