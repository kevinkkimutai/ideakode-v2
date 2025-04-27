const express = require('express');
const { handleMpesaCallback } = require('../controllers/paymentController');
const router = express.Router();


router.post('/mpesa/callback', handleMpesaCallback);

module.exports = router;

