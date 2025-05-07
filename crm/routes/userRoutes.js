const express = require('express');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');
const { register, login, profile, forgotPassword, resetPassword, resendVerificationToken, updateUser, allUsers } = require('../controllers/userController');

// CRUD Routes
router.post('/register', register); 
router.post('/login', login);
router.get('/profile',  profile);
router.post("/resend-verification", resendVerificationToken);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
router.put("/update-user",updateUser);
router.get("/all-users",allUsers);

module.exports = router;