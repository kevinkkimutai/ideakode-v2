const express = require('express');
const { createLead, getLeads, getLeadById, updateLead, deleteLead } = require('../controllers/leadController');
const router = express.Router();


router.post('/lead', createLead);       
router.get('/leads', getLeads);           
router.get('/leads/:id', getLeadById);     
router.put('/leads/:id', updateLead);     
router.delete('/leads/:id', deleteLead);  

module.exports = router;
