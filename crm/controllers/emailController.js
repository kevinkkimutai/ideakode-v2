'use strict';
const { sendRecordEmail } = require('../middleware/sendEmailRecord');
const { Email, User } = require('../models');

const createEmail = async (req, res) => {
  try {
    const {
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
      related_id,
    } = req.body;
    const userId = req.user.id;

    // Find user information
    let userEmail = from_address; // Default to provided from_address
    
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      // Use user email if from_address wasn't provided
      userEmail = user.email || from_address;
    }

    // First create the email record
    const email = await Email.create({
      thread_id,
      from_address: userEmail,
      to_addresses,
      cc_addresses,
      bcc_addresses,
      subject,
      body,
      sent_at,
      status,
      related_to,
      related_id,
      userId: userId
    });

    // Get the populated email record
    const populated = await Email.findByPk(email.id, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });

    // Try to send the email, but don't block the response
    try {
      await sendRecordEmail(
        thread_id, 
        userEmail, // Use the determined user email
        to_addresses, 
        cc_addresses, 
        bcc_addresses, 
        subject, 
        body
      );
      
      // Update the status to "sent" if it was successful
      if (populated.status === 'pending') {
        populated.status = 'sent';
        await populated.save();
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      
      // Update the status to "failed" if there was an error
      if (populated.status === 'pending') {
        populated.status = 'failed';
        await populated.save();
      }
    }

    // Return the created email record
    res.status(201).json({
      success: true,
      email: {
        id: populated.id,
        thread_id: populated.thread_id,
        from: populated.from_address,
        to: populated.to_addresses?.split(',').map(s => s.trim()),
        cc: populated.cc_addresses?.split(',').map(s => s.trim()),
        bcc: populated.bcc_addresses?.split(',').map(s => s.trim()),
        subject: populated.subject,
        body: populated.body,
        sent_at: populated.sent_at,
        status: populated.status,
        related: {
          type: populated.related_to,
          id: populated.related_id
        },
        created_by: populated.User
          ? {
              id: populated.User.id,
              name: `${populated.User.first_name} ${populated.User.last_name}`,
              email: populated.User.email
            }
          : null
      }
    });
  } catch (error) {
    console.error('Error creating email record:', error);
    res.status(500).json({ success: false, error: 'Error creating email record' });
  }
};

const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.findAll({
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });

    const formattedEmails = emails.map(email => ({
      id: email.id,
      thread_id: email.thread_id,
      from: email.from_address,
      to: email.to_addresses?.split(',').map(s => s.trim()),
      cc: email.cc_addresses?.split(',').map(s => s.trim()),
      bcc: email.bcc_addresses?.split(',').map(s => s.trim()),
      subject: email.subject,
      body: email.body,
      sent_at: email.sent_at,
      status: email.status,
      related: {
        type: email.related_to,
        id: email.related_id
      },
      created_by: email.User
        ? {
            id: email.User.id,
            name: `${email.User.first_name} ${email.User.last_name}`,
            email: email.User.email
          }
        : null
    }));

    return res.status(200).json({ success: true, emails: formattedEmails });
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
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });

    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const formattedEmail = {
      id: email.id,
      thread_id: email.thread_id,
      from: email.from_address,
      to: email.to_addresses?.split(',').map(s => s.trim()),
      cc: email.cc_addresses?.split(',').map(s => s.trim()),
      bcc: email.bcc_addresses?.split(',').map(s => s.trim()),
      subject: email.subject,
      body: email.body,
      sent_at: email.sent_at,
      status: email.status,
      related: {
        type: email.related_to,
        id: email.related_id
      },
      created_by: email.User
        ? {
            id: email.User.id,
            name: `${email.User.first_name} ${email.User.last_name}`,
            email: email.User.email
          }
        : null
    };

    return res.status(200).json({ success: true, email: formattedEmail });
  } catch (error) {
    console.error('Error fetching email:', error);
    return res.status(500).json({ success: false, message: 'Error fetching email' });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
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
    } = req.body;

    const email = await Email.findByPk(id);

    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    // Verify the user exists if userId is provided
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    }

    // Update the email record
    email.userId = userId || email.userId;
    email.thread_id = thread_id || email.thread_id;
    email.from_address = from_address || email.from_address;
    email.to_addresses = to_addresses || email.to_addresses;
    email.cc_addresses = cc_addresses || email.cc_addresses;
    email.bcc_addresses = bcc_addresses || email.bcc_addresses;
    email.subject = subject || email.subject;
    email.body = body || email.body;
    email.sent_at = sent_at || email.sent_at;
    email.status = status || email.status;
    email.related_to = related_to || email.related_to;
    email.related_id = related_id || email.related_id;

    await email.save();

    const updatedEmail = await Email.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });

    const formattedEmail = {
      id: updatedEmail.id,
      thread_id: updatedEmail.thread_id,
      from: updatedEmail.from_address,
      to: updatedEmail.to_addresses?.split(',').map(s => s.trim()),
      cc: updatedEmail.cc_addresses?.split(',').map(s => s.trim()),
      bcc: updatedEmail.bcc_addresses?.split(',').map(s => s.trim()),
      subject: updatedEmail.subject,
      body: updatedEmail.body,
      sent_at: updatedEmail.sent_at,
      status: updatedEmail.status,
      related: {
        type: updatedEmail.related_to,
        id: updatedEmail.related_id
      },
      created_by: updatedEmail.User
        ? {
            id: updatedEmail.User.id,
            name: `${updatedEmail.User.first_name} ${updatedEmail.User.last_name}`,
            email: updatedEmail.User.email
          }
        : null
    };

    return res.status(200).json({ success: true, email: formattedEmail });
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