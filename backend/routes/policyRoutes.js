const express = require('express');
const router = express.Router();
const upload = require('../middlewares/documentUpload');
const {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy,
} = require('../controllers/policyController');



router.post('/policy', upload.single('document'), createPolicy);
router.get('/policy', getAllPolicies);
router.get('/policy/:id', getPolicyById);
router.put('/policy/:id', upload.single('document'), updatePolicy);
router.delete('/policy/:id', deletePolicy);

module.exports = router;
