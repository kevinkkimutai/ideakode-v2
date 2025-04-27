'use strict';
const { sendRecordEmail } = require('../middleware/sendEmailRecord');
const { Email, User } = require('../models');

const createEmail = async (req, res) => {
  try {
    const { userId, thread_id, from_address, to_addresses, cc_addresses, bcc_addresses, subject, body, sent_at, status, related_to, related_id } = req.body;

    // Create a new email record
    const email = await Email.create({
      userId,
      thread_id,
      from_address,
      to_addresses,
      cc_addresses,
      bcc_addresses,
      subject,
      body,
      sent_at,
      status,
      related_to,
      related_id
    });

    await sendRecordEmail(thread_id, from_address, to_addresses, cc_addresses, bcc_addresses, subject, body);

    return res.status(201).json({ success: true, email });
  } catch (error) {
    console.error('Error creating email:', error);
    return res.status(500).json({ success: false, message: 'Error creating email' });
  }
};

const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.findAll({
      include: [
        { model: User, attributes: ['id', 'username', 'email'] }
      ]
    });

    return res.status(200).json({ success: true, emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return res.status(500).json({ success: false, message: 'Error fetching emails' });
  }
};

const getEmailById = async (req, res) => {
  try {
    const { id } = req.params;

    const email = await Email.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'username', 'email'] }
      ]
    });

    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    return res.status(200).json({ success: true, email });
  } catch (error) {
    console.error('Error fetching email:', error);
    return res.status(500).json({ success: false, message: 'Error fetching email' });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, thread_id, from_address, to_addresses, cc_addresses, bcc_addresses, subject, body, sent_at, status, related_to, related_id } = req.body;

    const email = await Email.findByPk(id);

    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    // Update the email record
    email.userId = userId;
    email.thread_id = thread_id;
    email.from_address = from_address;
    email.to_addresses = to_addresses;
    email.cc_addresses = cc_addresses;
    email.bcc_addresses = bcc_addresses;
    email.subject = subject;
    email.body = body;
    email.sent_at = sent_at;
    email.status = status;
    email.related_to = related_to;
    email.related_id = related_id;

    await email.save();

    return res.status(200).json({ success: true, email });
  } catch (error) {
    console.error('Error updating email:', error);
    return res.status(500).json({ success: false, message: 'Error updating email' });
  }
};

const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const email = await Email.findByPk(id);

    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    // Delete the email record
    await email.destroy();

    return res.status(200).json({ success: true, message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    return res.status(500).json({ success: false, message: 'Error deleting email' });
  }
};

module.exports = {
  createEmail,
  getAllEmails,
  getEmailById,
  updateEmail,
  deleteEmail
};
