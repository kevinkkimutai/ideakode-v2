const { Meeting, User, Contact } = require('../models'); // Import necessary models

// Create a new meeting
const createMeeting = async (req, res) => {
  try {
    const {
      organizerId,
      subject,
      description,
      location,
      meeting_Url,
      start_time,
      end_time,
      related_to,
      related_id,
    } = req.body;

    // Check if the organizer exists
    const organizer = await User.findByPk(organizerId);
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    const meeting = await Meeting.create({
      organizerId,
      subject,
      description,
      location,
      meeting_Url,
      start_time,
      end_time,
      related_to,
      related_id,
    });

    return res.status(201).json({ message: 'Meeting created successfully', meeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
};

// Get all meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      include: [
        { model: User, as: 'organizer', attributes: ['id', 'first_name', 'last_name'] },
        { model: User, as: 'Participants', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'GuestContacts', attributes: ['id', 'name', 'email'] },
      ],
    });
    return res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return res.status(500).json({ message: 'Error fetching meetings', error: error.message });
  }
};

// Get a meeting by ID
const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id, {
      include: [
        { model: User, as: 'organizer', attributes: ['id', 'first_name', 'last_name'] },
        { model: User, as: 'Participants', attributes: ['id', 'first_name', 'last_name'] },
        { model: Contact, as: 'GuestContacts', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    return res.status(200).json(meeting);
  } catch (error) {
    console.error('Error fetching meeting:', error);
    return res.status(500).json({ message: 'Error fetching meeting', error: error.message });
  }
};

// Update a meeting
const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      organizerId,
      subject,
      description,
      location,
      start_time,
      end_time,
      meeting_Url,
      related_to,
      related_id,
    } = req.body;

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Check if the organizer exists
    const organizer = await User.findByPk(organizerId);
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    // Update meeting details
    meeting.organizerId = organizerId;
    meeting.subject = subject;
    meeting.description = description;
    meeting.location = location;
    meeting.start_time = start_time;
    meeting.end_time = end_time;
    meeting.meeting_Url = meeting_Url;
    meeting.related_to = related_to;
    meeting.related_id = related_id;

    await meeting.save();

    return res.status(200).json({ message: 'Meeting updated successfully', meeting });
  } catch (error) {
    console.error('Error updating meeting:', error);
    return res.status(500).json({ message: 'Error updating meeting', error: error.message });
  }
};

// Delete a meeting
const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await meeting.destroy();
    return res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    return res.status(500).json({ message: 'Error deleting meeting', error: error.message });
  }
};

// Add participants to a meeting
const addParticipantsToMeeting = async (req, res) => {
  try {
    const { meetingId, participantIds } = req.body;

    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Check if participants exist
    const participants = await User.findAll({
      where: { id: participantIds },
    });
    if (participants.length !== participantIds.length) {
      return res.status(404).json({ message: 'One or more participants not found' });
    }

    await meeting.addParticipants(participants); // This will associate the meeting with the participants

    return res.status(200).json({ message: 'Participants added successfully' });
  } catch (error) {
    console.error('Error adding participants:', error);
    return res.status(500).json({ message: 'Error adding participants', error: error.message });
  }
};

// Add guest contacts to a meeting
const addGuestContactsToMeeting = async (req, res) => {
  try {
    const { meetingId, contactIds } = req.body;

    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Check if contacts exist
    const contacts = await Contact.findAll({
      where: { id: contactIds },
    });
    if (contacts.length !== contactIds.length) {
      return res.status(404).json({ message: 'One or more contacts not found' });
    }

    await meeting.addGuestContacts(contacts); // This will associate the meeting with the guest contacts

    return res.status(200).json({ message: 'Guest contacts added successfully' });
  } catch (error) {
    console.error('Error adding guest contacts:', error);
    return res.status(500).json({ message: 'Error adding guest contacts', error: error.message });
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  addParticipantsToMeeting,
  addGuestContactsToMeeting,
};
