const express = require('express');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');

// Create a new contact
router.post('/contact', auth, createContact);
// Get all contacts
router.get('/contacts', getAllContacts);

// Get a contact by ID
router.get('/contact/:id', getContactById);

// Update a contact by ID
router.put('/contact/:id', auth, updateContact);

// Delete a contact by ID
router.delete('/contact/:id', auth, deleteContact);

module.exports = router;
