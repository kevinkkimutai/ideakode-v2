const express = require('express');
const { createEmail, getAllEmails, getEmailById, updateEmail, deleteEmail } = require('../controllers/emailController');
const router = express.Router();


// Create a new email
router.post('/email', createEmail);
// Get all emails
router.get('/emails', getAllEmails);
// Get an email by ID
router.get('/emails/:id', getEmailById);
// Update an email by ID
router.put('/emails/:id', updateEmail);
// Delete an email by ID
router.delete('/emails/:id', deleteEmail);

module.exports = router;
