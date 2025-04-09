const path = require("path");
const { Contact } = require("../models");
const { sendForgotPasswordEmail } = require("../middlewares/sendEmail");

// Create a new contact
const createContact = async (req, res) => {
    try {
      const { name, description, email, phone } = req.body;
  
      const contact = await Contact.create({
        name,
        description,
        email,
        phone,
      });
  
      // Email content
      const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
           Support Inquiry
          </div>
          <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="font-size: 16px; color: #333;">From,  <strong>${contact.name}</strong>,</p>
            <p style="font-size: 16px; color: #555;">${contact.description}</p>
  
            <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; text-align: center;">
              <p style="font-size: 14px; color: #777; margin-bottom: 5px;">Best Regards,</p>
              <p style="font-size: 16px; font-weight: bold; color: #333;">${contact.name}</p>
              <p style="font-size: 14px; color: #555;">Phone: ${contact.phone}</p>
            </div>
          </div>
        </div>
      `;
  
      try {
        await sendForgotPasswordEmail({
          email: contact.email,
          subject: "Support Inquiry",
          message,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Optionally log this somewhere, but do not throw
      }
  
      // Only send the response **once**, after everything
      return res.status(201).json({
        message: "Contact created successfully 🎉",
        Contact: contact,
      });
  
    } catch (error) {
      console.error('Support ticket creation failed:', error);
      return res.status(500).json({ error: error.message });
    }
  };
  
// Get all contacts
const getAllContacts = async (req, res) => {
try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get a single contact
const getContactById = async (req, res) => {
try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
        return res.status(404).json({ error: "Contact not found 🥶" });
    }
    res.status(200).json(contact);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Update a contact
const updateContact = async (req, res) => {
try {
    const { id } = req.params;
    const { name, description, email, phone } = req.body;
    const contact = await Contact.findByPk(id);
    if (!contact) {
        return res.status(404).json({ error: "Contact not found 🥶" });
    }

    const updatedContact = await contact.update({
        name: name || contact.name,
        description: description || contact.description,
        email: email || contact.email,
        phone: phone || contact.phone,
       
    });
    res.status(200).json({
        message: "Contact updated successfully 🎉.",
        contact: updatedContact,
      });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Delete a contact
const deleteContact = async (req, res) => {
try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
        return res.status(404).json({ error: "Contact not found🥶" });
    }
    await contact.destroy();
    res.status(200).json({ message: "Contact deleted successfully 🥺" });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}




module.exports = {createContact, getAllContacts, getContactById, updateContact, deleteContact}