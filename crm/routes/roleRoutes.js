const express = require('express');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/roleController');
const router = express.Router();


// Create role
router.post('/role', createRole);
router.get('/roles', getAllRoles);
router.get('/role/:id', getRoleById);
router.put('/role/:id', updateRole);
router.delete('/role/:id', deleteRole);

module.exports = router;
