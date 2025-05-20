const express = require('express');
const { createLead, getLeads, getLeadById, updateLead, deleteLead, getLeadsByUser, getLeadsAssignedTo } = require('../controllers/leadController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');


router.post('/lead', auth, createLead);       
router.get('/leads', getLeads);           
router.get('/lead/:id', auth, getLeadById);    
router.get('/my-leads', auth, getLeadsByUser);
router.get('/my-assigned-leads', auth, getLeadsAssignedTo);
router.put('/lead/:id', auth, updateLead);     
router.delete('/lead/:id', auth, deleteLead);  

module.exports = router;
