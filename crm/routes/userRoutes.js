const express = require('express');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');
const upload = require('../middleware/uploads');


const { register, login, profile, forgotPassword, resetPassword, resendVerificationToken, updateUser, allUsers, Verification } = require('../controllers/userController');

// CRUD Routes
router.post('/register', register); 
router.post('/login', login);
router.get('/profile', auth,  profile);
router.post("/resend-verification", resendVerificationToken);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
router.put("/update-user", auth, upload, updateUser);
router.get("/all-users", auth, allUsers);
router.get("/verify/:token", Verification);

module.exports = router;