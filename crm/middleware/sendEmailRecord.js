const nodemailer = require('nodemailer');

// SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Generic email sender
const sendEmail = async (to, cc, bcc, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      cc,  // Include CC addresses
      bcc, // Include BCC addresses
      subject,
      html: message, // Appending signature
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

// Generate the email content
const generateRecordEmail = (name, subject, body) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        ${subject}
      </div>
      <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        <p style="font-size: 16px; color: #333;">Hi <strong>Sir/Madam</strong>,</p>
        <p style="font-size: 16px; color: #555;">${body}</p>
      
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
};

// Send the email after creating a record
const sendRecordEmail = async (to_addresses, cc_addresses, bcc_addresses, subject, body, name) => {
  const message = generateRecordEmail(name, subject, body);
  return sendEmail(to_addresses, cc_addresses, bcc_addresses, subject, message);
};

module.exports = {
  sendRecordEmail,
};
