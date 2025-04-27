const express = require('express');
const { createMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting, addParticipantsToMeeting, addGuestContactsToMeeting } = require('../controllers/meetingController');
const router = express.Router();


router.post('/meeting', createMeeting); 
router.get('/meetings', getMeetings); 
router.get('/meetings/:id', getMeetingById); 
router.put('/meetings/:id', updateMeeting); 
router.delete('/meetings/:id', deleteMeeting); 
router.post('/meetings/participants', addParticipantsToMeeting); 
router.post('/meetings/guest-contacts', addGuestContactsToMeeting);

module.exports = router;
