const { sendForgotPasswordEmail } = require('../middlewares/sendEmail');
const { Subscriber } = require('../models');

// Create a new subscriber
const createSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });
        const existingSubscriber = await Subscriber.findOne({ where: { email } });
        if (existingSubscriber) {
          return res.status(400).json({ error: "You already a subscriber 🥶" });
        }
        const newSubscriber = await Subscriber.create({ email, status: 1 });
        const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            🎉 Welcome to Netiqa!
          </div>
          <div style="padding: 20px; background-color: #e9ffe4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="font-size: 16px; color: #333;">Hi there,</p>
            <p style="font-size: 16px; color: #555;">
              Thank you for subscribing to Netiqa! You're now part of our growing community, and we’re excited to share exclusive updates, special offers, and valuable insights with you.
            </p>
            <p style="font-size: 16px; color: #555;">
              Stay tuned for exciting content, and feel free to reach out if you have any questions!
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://netiqa.com" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
                Visit Our Website
              </a>
            </div>
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
            email: newSubscriber.email,
            subject: "  🎉 Welcome to Netiqa!",
            message: message,
          });

        return res.status(201).json(newSubscriber);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all subscribers
const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.findAll();
        return res.status(200).json(subscribers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get a single subscriber by ID
const getSubscriberById = async (req, res) => {
    try {
        const { id } = req.params;
        const subscriber = await Subscriber.findByPk(id);
        if (!subscriber) return res.status(404).json({ error: "Subscriber not found" });

        return res.status(200).json(subscriber);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update a subscriber
const updateSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, status } = req.body;

        const subscriber = await Subscriber.findByPk(id);
        if (!subscriber) return res.status(404).json({ error: "Subscriber not found" });

        await subscriber.update({ email, status });
        return res.status(200).json(subscriber);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const unsubscribeSubscriber = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email input
        if (!email) return res.status(400).json({ error: "Email is required to unsubscribe" });

        // Check if the subscriber exists
        const subscriber = await Subscriber.findOne({ where: { email } });
        if (!subscriber) {
            return res.status(404).json({ error: "Subscriber not found" });
        }

        // Update subscriber status to 0 (inactive)
        await subscriber.update({ status: 0 });

        // Send an email confirmation to the user
        const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #d9534f; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
             You have unsubscribed from Netiqa
          </div>
          <div style="padding: 20px; background-color: #e9ffe4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="font-size: 16px; color: #333;">Hi there,</p>
            <p style="font-size: 16px; color: #555;">
              We're sorry to see you go! You have successfully unsubscribed from Netiqa's updates and newsletters.
            </p>
            <p style="font-size: 16px; color: #555;">
              If this was a mistake, or if you ever wish to resubscribe, you can do so at any time by visiting our website.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://netiqa.com" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #d9534f; text-decoration: none; border-radius: 5px;">
                Resubscribe
              </a>
            </div>
            <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; text-align: center;">
              <p style="font-size: 14px; color: #777; margin-bottom: 5px;">Best Regards,</p>
              <p style="font-size: 16px; font-weight: bold; color: #333;">Netiqa Team</p>
              <p style="font-size: 14px; color: #555;">Email: support@netiqa.com</p>
              <p style="font-size: 14px; color: #555;">Phone: +242746645142</p>
            </div>
          </div>
        </div>
        `;

        // Send email notification
        await sendForgotPasswordEmail({
            email: subscriber.email,
            subject: "Unsubscription Confirmation - Netiqa",
            message: message,
        });

        return res.status(200).json({ message: "You have successfully unsubscribed." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a subscriber
const deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        const subscriber = await Subscriber.findByPk(id);
        if (!subscriber) return res.status(404).json({ error: "Subscriber not found" });

        await subscriber.destroy();
        return res.status(200).json({ message: "Subscriber deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { createSubscriber, getAllSubscribers, getSubscriberById, updateSubscriber, unsubscribeSubscriber, deleteSubscriber}