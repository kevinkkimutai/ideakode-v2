'use strict';
const { Contact, Customer, Opportunity, Ticket, Meeting } = require('../models');

const createContact = async (req, res) => {
  try {
    const { customerId, first_name, last_name, email, phone, mobile, job_title, is_primary, notes } = req.body;

    // Create a new contact record
    const contact = await Contact.create({
      customerId,
      first_name,
      last_name,
      email,
      phone,
      mobile,
      job_title,
      is_primary,
      notes
    });

    return res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error('Error creating contact:', error);
    return res.status(500).json({ success: false, message: 'Error creating contact' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      include: [
        { model: Customer, attributes: ['id', 'name'] },
        { model: Opportunity, attributes: ['id', 'title'] },
        { model: Ticket, attributes: ['id', 'subject'] },
        { model: Meeting, attributes: ['id', 'date'] }
      ]
    });

    return res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id, {
      include: [
        { model: Customer, attributes: ['id', 'name'] },
        { model: Opportunity, attributes: ['id', 'title'] },
        { model: Ticket, attributes: ['id', 'subject'] },
        { model: Meeting, attributes: ['id', 'date'] }
      ]
    });

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    return res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return res.status(500).json({ success: false, message: 'Error fetching contact' });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, first_name, last_name, email, phone, mobile, job_title, is_primary, notes } = req.body;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Update the contact record
    contact.customerId = customerId;
    contact.first_name = first_name;
    contact.last_name = last_name;
    contact.email = email;
    contact.phone = phone;
    contact.mobile = mobile;
    contact.job_title = job_title;
    contact.is_primary = is_primary;
    contact.notes = notes;

    await contact.save();

    return res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ success: false, message: 'Error updating contact' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Delete the contact record
    await contact.destroy();

    return res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ success: false, message: 'Error deleting contact' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
};
