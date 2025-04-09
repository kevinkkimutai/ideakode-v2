const express = require("express");

const authenticate = require("../middlewares/auth");
const upload = require("../middlewares/uploadImage");
const { createContact, getAllContacts, getContactById,  updateContact, deleteContact } = require("../controllers/contactController");

const router = express.Router();

// Route to create a new contact
router.post("/contact", createContact);

// Route to get all contacts
router.get("/contacts", getAllContacts); 

// Route to get a single contact by ID
router.get("/contact/:id", getContactById);

// Route to update a contact by ID
router.put("/contact/:id", updateContact);

// Route to delete a contact by ID
router.delete("/contact/:id", deleteContact);

module.exports = router;
