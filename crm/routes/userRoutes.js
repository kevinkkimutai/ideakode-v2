const express = require('express');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');
const { register, login, profile, forgotPassword, resetPassword, resendVerificationToken } = require('../controllers/userController');

// CRUD Routes
router.post('/register', register); 
router.post('/login', login);
router.get('/profile', auth, profile);
router.post("/resend-verification", resendVerificationToken);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword)

module.exports = router;