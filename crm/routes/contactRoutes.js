const express = require('express');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();

// Create a new contact
router.post('/contacts', createContact);
// Get all contacts
router.get('/contacts', getAllContacts);

// Get a contact by ID
router.get('/contacts/:id', getContactById);

// Update a contact by ID
router.put('/contacts/:id', updateContact);

// Delete a contact by ID
router.delete('/contacts/:id', deleteContact);

module.exports = router;
