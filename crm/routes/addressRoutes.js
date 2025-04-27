const express = require('express');
const { createAddress, getAll, getById, updateAddress, deleteAddress } = require('../controllers/addressController');
const router = express.Router();


router.post('/address', createAddress);
router.get('/all-address', getAll);
router.get('/address/:id', getById);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', deleteAddress);

module.exports = router;
