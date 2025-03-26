const { sendAnnounceEmail } = require("../middlewares/sendEmail");
const { Policy, User, Notification } = require("../models");
const path = require("path");

const createPolicy = async (req, res) => {
  try {
    const { name, description } = req.body;
    let documentUrl = null;

    if (req.file) {
      documentUrl = path.join(`${process.env.BACKEND_URL}/uploads/documents`, req.file.filename);
    }

    // Create the policy
    const policy = await Policy.create({
      name,
      description,
      document: documentUrl,
    });

    // Send response to the client
    res.status(201).json({
      message: 'Policy created successfully 🎉',
      policy,
    });

    // Fetch all users for email and in-app notifications
    const users = await User.findAll({ attributes: ["id", "email"] });

    if (users.length > 0) {
      // Create the email message
      const emailMessage = `
        <h2>Hi,</h2>
        <p>New Policy: <strong>${policy.name}</strong></p>
        <p><strong>Details:</strong></p>
        <p>${policy.description}</p>
        <p>Thank you.</p>
      `;

      // Send emails to all users
      const emailPromises = users.map((user) =>
        sendAnnounceEmail(user.email, "New Policy", emailMessage)
      );

      // Await all email operations to finish
      await Promise.all(emailPromises);

      // Create in-app notifications for all users
      const notificationMessage = `New Policy: ${policy.name}`;
      const notificationPromises = users.map((user) =>
        Notification.create({
          userId: user.id,
          type: "policy",
          message: notificationMessage,
          metadata: { policyId: policy.id },
        })
      );

      // Await all notification operations to finish
      await Promise.all(notificationPromises);

      // Emit real-time notifications using Socket.io
      const io = req.app.get('io');
      if (!io) {
        throw new Error('Socket.io instance not found');
      }

      users.forEach((user) => {
        io.to(`user_${user.id}`).emit('newPolicy', {
          type: "policy",
          message: notificationMessage,
          metadata: { policyId: policy.id },
        });
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { createPolicy };

const getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.findAll();
        res.status(200).json({policies});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getPolicyById = async (req, res) => {
    try {
        const {id} = req.params;
        const policy = await Policy.findByPk(id);
        if (!policy) {
            return res.status(404).json({error: 'Policy not found 🥶'});
        }
        res.status(200).json({policy});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updatePolicy = async (req, res) =>{
try {
    const {id} = req.params;
    const {name, description, document} = req.body;
    let documentUrl = null;

    if (req.file) {
        documentUrl = path.join(`${process.env.BACKEND_URL}/uploads/documents`, req.file.filename);
    }

    const policy = await Policy.findByPk(id);
    if (!policy) {
        return res.status(404).json({error: 'Policy not found ���'});
    }

    const updatedPolicy = await policy.update({
        name: name || policy.name,
        description: description || policy.description,
        document: documentUrl || policy.document,
    });
    res.status(200).json({
        message: 'Policy updated successfully 🎉',
        policy: updatedPolicy
    });
    
} catch (error) {
    res.status(500).json({error: error.message});
}
}

const deletePolicy = async (req, res) => {
    try {
        const {id} = req.params;
        const policy = await Policy.findByPk(id);
        if (!policy) {
            return res.status(404).json({error: 'Policy not found 🥶'});
        }
        await policy.destroy();
        res.status(200).json({message: 'Policy deleted successfully 🎉'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy,
}