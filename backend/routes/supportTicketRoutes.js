const express = require("express");

const authenticate = require("../middlewares/auth");
const upload = require("../middlewares/uploadImage");
const { createSupportTicket, getAllSupportTickets, getSupportTicketById, getUserSupportTickets, updateSupportTicket, updateSupportTicketStatus, getSupportTicketsByUser, deleteSupportTicket } = require("../controllers/SupportTicketController");

const router = express.Router();

// Route to create a new ticket
router.post("/ticket", createSupportTicket);

// Route to get all tickets
router.get("/tickets", getAllSupportTickets);

// Route to get a single ticket by ID
router.get("/ticket/:id", getSupportTicketById);

router.get("/assigned/tickets", authenticate, getUserSupportTickets);

// Route to update a ticket by ID
router.put("/ticket/:id", updateSupportTicket);

// Route to update the status of a ticket by ID
router.put("/ticket/:id/status", updateSupportTicketStatus);

// Route to get tickets created by a specific user
router.get("/tickets/user/:userId", getSupportTicketsByUser);

// Route to delete a ticket by ID
router.delete("/ticket/:id", deleteSupportTicket);

module.exports = router;
