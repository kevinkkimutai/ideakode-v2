const express = require('express');
const { createMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting, addParticipantsToMeeting, addGuestContactsToMeeting } = require('../controllers/meetingController');
const router = express.Router();


router.post('/meeting', createMeeting); 
router.get('/meetings', getMeetings); 
router.get('/meeting/:id', getMeetingById); 
router.put('/meeting/:id', updateMeeting); 
router.delete('/meeting/:id', deleteMeeting); 
router.post('/meeting/participants', addParticipantsToMeeting); 
router.post('/meeting/guest-contacts', addGuestContactsToMeeting);

module.exports = router;
