const { QuoteRequest } = require('../models');
const { sendForgotPasswordEmail, sendAnnounceEmail } = require("../middlewares/sendEmail");

// Create a new quote
const createQuote = async (req, res) => {
    try {
      const { name, description, service, budget, timeline, fullname, email, phone, status } = req.body;
  
      const quote = await QuoteRequest.create({
        name,
        description,
        service,
        budget,
        timeline,
        fullname,
        email,
        phone,
        status: status || 'pending',
      });
  
      const subject = `Quote Request Confirmation - ${service}`;
  
      const userMessage = `
        <div style="background-color:#f4f4f4;padding:20px 0;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);">
            <div style="background-color:#4CAF50;color:#fff;padding:20px;text-align:center;">
              <h2 style="margin:0;font-size:24px;">We've Received Your Quote Request!</h2>
            </div>
            <div style="padding:30px;">
              <p style="font-size:16px;color:#333;">Hi ${fullname},</p>
              <p style="font-size:16px;color:#333;">
                Thank you for reaching out to <strong>Netiqa</strong>. We’ve received your quote request and one of our team members will be in touch shortly.
              </p>
              <h3 style="margin-top:25px;color:#4CAF50;">Here’s a quick summary:</h3>
              <ul style="list-style:none;padding:0;font-size:16px;color:#333;">
                <li><strong>Service:</strong> ${service}</li>
                <li><strong>Estimated Budget:</strong> $${budget}</li>
                <li><strong>Timeline:</strong> ${timeline}</li>
              </ul>
              <p style="margin-top:30px;font-size:16px;color:#333;">
                If you need to make any changes or have questions, feel free to reply to this email or call us anytime.
              </p>
              <div style="margin-top:40px;text-align:center;">
                <a href="https://netiqa.co.ke" style="background-color:#4CAF50;color:#fff;text-decoration:none;padding:12px 25px;border-radius:5px;font-size:16px;">Visit Our Website</a>
              </div>
            </div>
            <div style="background:#f0f0f0;padding:20px;text-align:center;font-size:14px;color:#777;">
              <p style="margin:5px;">Netiqa Solutions</p>
              <p style="margin:5px;">info@netiqa.com | +254722214567</p>
              <div style="margin-top:10px;">
                <a href="https://facebook.com/netiqa" style="margin:0 5px;">
                  <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook">
                </a>
                <a href="https://twitter.com/netiqa" style="margin:0 5px;">
                  <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter">
                </a>
                <a href="https://linkedin.com/company/netiqa" style="margin:0 5px;">
                  <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn">
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
  
      const adminMessage = `
        <div style="background-color:#f4f4f4;padding:20px 0;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);">
            <div style="background-color:#4CAF50;color:#fff;padding:20px;text-align:center;">
              <h2 style="margin:0;font-size:24px;">New Quote Request</h2>
            </div>
            <div style="padding:30px;">
              <p style="font-size:16px;color:#333;">Hello,</p>
              <p style="font-size:16px;color:#333;">You’ve received a new quote request from <strong>${fullname}</strong>.</p>
  
              <table style="width:100%;margin-top:20px;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#555;">Service:</td>
                  <td style="padding:10px 0;color:#333;">${service}</td>
                </tr>
                <tr style="background-color:#f9f9f9;">
                  <td style="padding:10px 0;font-weight:bold;color:#555;">Budget:</td>
                  <td style="padding:10px 0;color:#333;">$${budget}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#555;">Timeline:</td>
                  <td style="padding:10px 0;color:#333;">${timeline}</td>
                </tr>
                <tr style="background-color:#f9f9f9;">
                  <td style="padding:10px 0;font-weight:bold;color:#555;">Description:</td>
                  <td style="padding:10px 0;color:#333;">${description}</td>
                </tr>
              </table>
  
              <p style="margin-top:30px;font-size:16px;color:#333;">You can follow up with the client directly for more details.</p>
  
              <div style="margin-top:40px;text-align:center;">
                <a href="https://admin.netiqa.co.ke" style="background-color:#4CAF50;color:#fff;text-decoration:none;padding:12px 25px;border-radius:5px;font-size:16px;">View Dashboard</a>
              </div>
            </div>
            <div style="background:#f0f0f0;padding:20px;text-align:center;font-size:14px;color:#777;">
              <p style="margin:5px;">Netiqa Solutions</p>
              <p style="margin:5px;">info@netiqa.com | +254722214567</p>
              <div style="margin-top:10px;">
                <a href="https://facebook.com/netiqa" style="margin:0 10px;">
                  <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook">
                </a>
                <a href="https://twitter.com/netiqa" style="margin:0 10px;">
                  <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter">
                </a>
                <a href="https://linkedin.com/company/netiqa" style="margin:0 10px;">
                  <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn">
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
  
      // Send emails
      await sendForgotPasswordEmail({
        email,
        subject,
        message: userMessage,
      });
  
      await sendAnnounceEmail({
        email: 'kelvin@netiqa.com',
        subject: `New Quote Request from ${fullname}`,
        cc: ['samson.mburu@netiqa.co.ke', 'isaac.okoth@netiqa.co.ke'],
        bcc: ['info@netiqa.co.ke'],
        message: adminMessage,
      });
  
      return res.status(201).json({ message: 'Quote created successfully', quote });
  
    } catch (error) {
      console.error('Quote creation failed:', error);
      return res.status(500).json({ message: 'Error creating quote', error: error.message });
    }
  };
  
// Update status of a quote
const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const quote = await QuoteRequest.findByPk(id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    quote.status = status;
    await quote.save();

    res.status(200).json({ message: 'Status updated successfully', quote });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

// Get all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await QuoteRequest.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ quotes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};

// Delete a quote
const deleteQuote = async (req, res) => {
  try {
    const { id } = req.body;

    const quote = await QuoteRequest.findByPk(id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    await quote.destroy();

    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quote', error: error.message });
  }
};

module.exports = {
  createQuote,
  updateStatus,
  getAllQuotes,
  deleteQuote,
};
