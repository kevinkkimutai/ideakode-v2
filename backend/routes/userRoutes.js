const express = require('express');
const router = express.Router();
const upload = require("../middlewares/uploadImage");
const authenticate = require('../middlewares/auth');
const { getAllUsers, register, loginUser, getUserById, updateUser, deleteUser, forgotPassword, logout, resetPassword, getCurrentUser } = require('../controllers/userController');
const { verifyRole } = require('../middlewares/veryfyRole');


// CRUD Routes
router.post('/register', register); 
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post("/reset-password", resetPassword);
router.post('/logout', logout);
router.get("/currentuser", authenticate, getCurrentUser);

router.get('/users', authenticate, getAllUsers); 
router.get('/user/:id', authenticate, getUserById); 
router.put('/user/:id', authenticate, upload.single("image"), updateUser); 
router.delete('/user/:id', authenticate, deleteUser);

module.exports = router;
