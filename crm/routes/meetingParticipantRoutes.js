const express = require('express');
const { createMeetingParticipant, getMeetingParticipants, updateMeetingParticipant, deleteMeetingParticipant } = require('../controllers/meetingParticipantController');
const router = express.Router();


// Create Meeting Participant
router.post('/meeting-participant', createMeetingParticipant);
// Get Meeting Participants
router.get('/meetings/:meetingId/participants', getMeetingParticipants);
// Update Meeting Participant
router.put('/meeting-participant/:id', updateMeetingParticipant);
// Delete Meeting Participant
router.delete('/meeting-participant/:id', deleteMeetingParticipant);

module.exports = router;
