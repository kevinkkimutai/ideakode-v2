const path = require("path");
const { SupportTicket, User, SupportCategory } = require("../models");
const { sendForgotPasswordEmail } = require("../middlewares/sendEmail");

// Create a new supportTicket
const createSupportTicket = async (req, res) => {
try {

    const {subject, description, supportId, email, fullname, phone, time, status} = req.body;

    if  (supportId) {
        const supportCategory = await SupportCategory.findByPk(supportId);
        if (!supportCategory) {
            return res.status(404).json({ error: "SupportCategory not found 🥶" });
        }
    }

    const supportTicket = await SupportTicket.create({
        subject,
        description,
        supportId, 
        email, 
        fullname,
        phone,
        time,
        status,
    });
    res.status(201).json({
        message: "SupportTicket created successfully 🎉",
        SupportTicket: supportTicket,
      });

         // Email content
    const message = `

    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
   <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
    ${supportTicket.subject}
   </div>
   <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
     <p style="font-size: 16px; color: #333;">From,  <strong>${supportTicket.fullname}</strong>,</p>
     <p style="font-size: 16px; color: #555;">
     ${supportTicket.description}
     </p>
     
     <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; text-align: center;">
       <p style="font-size: 14px; color: #777; margin-bottom: 5px;">Best Regards,</p>
       <p style="font-size: 16px; font-weight: bold; color: #333;">Netiqa Team</p>
       <p style="font-size: 14px; color: #555;">Email: support@netiqa.com</p>
       <p style="font-size: 14px; color: #555;">Phone: +242746645142</p>
       <div style="margin-top: 10px;">
         <a href="https://facebook.com/netiqa" style="text-decoration: none; margin: 0 5px;">
           <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook">
         </a>
         <a href="https://twitter.com/netiqa" style="text-decoration: none; margin: 0 5px;">
           <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter">
         </a>
         <a href="https://linkedin.com/company/netiqa" style="text-decoration: none; margin: 0 5px;">
           <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn">
         </a>
       </div>
     </div>
   </div>
 </div>
 `;
 

   // Send the email (ensure the email function is properly implemented)
   await sendForgotPasswordEmail({
     email: supportTicket.email,
     subject: supportTicket.subject,
     message: message,
   });
    
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get all supportTickets
const getAllSupportTickets = async (req, res) => {
try {
    const supportTickets = await SupportTicket.findAll({
        include: [
            {
                model: SupportCategory,
                as: "supportcategory",
                attributes: ["id", "name"],
              },
          ],
    });
    res.status(200).json(supportTickets);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get a single supportTicket
const getSupportTicketById = async (req, res) => {
try {
    const { id } = req.params;
    const supportTicket = await SupportTicket.findByPk(id, {
        include: [
              { 
                model: SupportCategory, 
                as: 'supportcategory',
                attributes: ["id", "name"],
            },
          ],
    });
    if (!supportTicket) {
        return res.status(404).json({ error: "SupportTicket not found 🥶" });
    }
    res.status(200).json(supportTicket);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Update a supportTicket
const updateSupportTicket = async (req, res) => {
try {
    const { id } = req.params;
    const { subject, description, userId, supportId, email, fullname, phone, time, status } = req.body;
    const supportTicket = await SupportTicket.findByPk(id);
    if (!supportTicket) {
        return res.status(404).json({ error: "SupportTicket not found 🥶" });
    }

    const updatedSupportTicket = await supportTicket.update({
        subject: subject || supportTicket.subject,
        description: description || supportTicket.description,
        userId: userId || supportTicket.userId,
        supportId: supportId || supportTicket.supportCategory,
        email: email || supportTicket.email,
        fullname: fullname || supportTicket.fullname,
        phone: phone || supportTicket.phone,
        time: time || supportTicket.time,
        status: status || supportTicket.status,
    });
    res.status(200).json({
        message: "SupportTicket updated successfully 🎉.",
        supportTicket: updatedSupportTicket,
      });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}
// Update a supportTicket status
const updateSupportTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const supportTicket = await SupportTicket.findByPk(id);
        if (!supportTicket) {
            return res.status(404).json({ error: "SupportTicket not found 🥶" });
        }
        const updatedSupportTicket = await supportTicket.update({
            status: status || supportTicket.status,
        });
        res.status(200).json({
            message: "SupportTicket Status updated successfully 🎉.",
            supportTicket: updatedSupportTicket,
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

// Delete a supportTicket
const deleteSupportTicket = async (req, res) => {
try {
    const { id } = req.params;
    const supportTicket = await SupportTicket.findByPk(id);
    if (!supportTicket) {
        return res.status(404).json({ error: "SupportTicket not found🥶" });
    }
    await supportTicket.destroy();
    res.status(200).json({ message: "SupportTicket deleted successfully 🥺" });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get supportTickets created a user
const getSupportTicketsByUser = async (req, res) => {
try {
    const { userId } = req.params;
    const supportTickets = await SupportTicket.findAll({ where: { userId } });
    if (!supportTickets) {
        return res.status(404).json({ error: "SupportTickets not found for this user 🥶" });
    }
    res.status(200).json(supportTickets);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

    // Get supportTickets assigned to a user
    const getUserSupportTickets = async (req, res) => {
        try {
            const userId  = req.user.id;
            const supportTickets = await SupportTicket.findAll({
                where: { assignedTo: userId } ,
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email"],
                      },
                  ],
            });
            res.status(200).json(supportTickets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        }

module.exports = {createSupportTicket, getAllSupportTickets, getSupportTicketById, getUserSupportTickets, updateSupportTicket, updateSupportTicketStatus, getSupportTicketsByUser, deleteSupportTicket}