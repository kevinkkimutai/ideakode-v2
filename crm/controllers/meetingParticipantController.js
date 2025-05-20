const { MeetingParticipant, Meeting, User, Contact } = require('../models'); // Import necessary models

// Create a new meeting participant
const createMeetingParticipant = async (req, res) => {
  try {
    const { meetingId, userId, contactId, status, response_time } = req.body;

    // Check if meeting, user, and contact exist
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const contact = contactId ? await Contact.findByPk(contactId) : null;
    if (contactId && !contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Create a new meeting participant
    const meetingParticipant = await MeetingParticipant.create({
      meetingId,
      userId,
      contactId,
      status,
      response_time
    });

    return res.status(201).json({ message: 'Meeting participant created successfully', meetingParticipant });
  } catch (error) {
    console.error('Error creating meeting participant:', error);
    return res.status(500).json({ message: 'Error creating meeting participant', error: error.message });
  }
};

// Get all participants for a specific meeting
const getMeetingParticipants = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const participants = await MeetingParticipant.findAll({
      where: { meetingId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'contact', attributes: ['id', 'first_name', 'email'] },
      ],
    });

    if (participants.length === 0) {
      return res.status(404).json({ message: 'No participants found for this meeting' });
    }

    return res.status(200).json(participants);
  } catch (error) {
    console.error('Error fetching participants:', error);
    return res.status(500).json({ message: 'Error fetching participants', error: error.message });
  }
};

// Update a meeting participant's status
const updateMeetingParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response_time } = req.body;

    const participant = await MeetingParticipant.findByPk(id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    // Update participant's status and response time
    participant.status = status;
    participant.response_time = response_time;

    await participant.save();

    return res.status(200).json({ message: 'Meeting participant updated successfully', participant });
  } catch (error) {
    console.error('Error updating meeting participant:', error);
    return res.status(500).json({ message: 'Error updating meeting participant', error: error.message });
  }
};

// Delete a meeting participant
const deleteMeetingParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await MeetingParticipant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    await participant.destroy();

    return res.status(200).json({ message: 'Meeting participant deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting participant:', error);
    return res.status(500).json({ message: 'Error deleting meeting participant', error: error.message });
  }
};

module.exports = {
  createMeetingParticipant,
  getMeetingParticipants,
  updateMeetingParticipant,
  deleteMeetingParticipant,
};
