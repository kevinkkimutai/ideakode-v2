const express = require('express');
const { createEmail, getAllEmails, getEmailById, updateEmail, deleteEmail } = require('../controllers/emailController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');


// Create a new email
router.post('/email', auth, createEmail);
// Get all emails
router.get('/emails', getAllEmails);
// Get an email by ID
router.get('/email/:id', getEmailById);
// Update an email by ID
router.put('/email/:id', updateEmail);
// Delete an email by ID
router.delete('/email/:id', deleteEmail);

module.exports = router;
