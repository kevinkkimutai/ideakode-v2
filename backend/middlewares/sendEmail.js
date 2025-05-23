
// const { Resend } = require('resend');

// const resend = new Resend(process.env.RESEND_API_KEY);

// // Email signature (can be customized)
// const signature = `
//   <br><br>
//   <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       Best Regards,<br>
//   The IdeaKode Team<br>
//   <a href="https://ideakode.vercel.com">Visit our website</a>
//     </div>
  
// `;

// const sendEmail = async (email, subject, message) => {
//   try {
//     await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL,
//       to: email,
//       subject,
//       html: `${message}`,
//     });
//     console.log('Email sent!');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error(`Error sending email: ${error.message}`);
//   }
// };

// const sendWelcomeEmail = async (email, subject, message) => {
//   return sendEmail(email, subject, message);
// };

// const sendAnnounceEmail = async (email, subject, message) => {
//   return sendEmail(email, subject, message);
// };

// const sendForgotPasswordEmail = async ({ email, subject, message }) => {
//   return sendEmail(email, subject, message);
// };

// module.exports = { sendWelcomeEmail, sendForgotPasswordEmail, sendAnnounceEmail };


const nodemailer = require('nodemailer');

// Email signature
const signature = `
  <br><br>
  <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
      Best Regards,<br>
      The IdeaKode Team<br>
      <a href="https://ideakode.vercel.com">Visit our website</a>
  </div>
`;

// SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@netiqa.co.ke',
    pass: 'Netiqa@2025',
  },
});

// Generic email sender
const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: "info@netiqa.co.ke",
      to,
      subject,
      html: `${message}`, // Appending signature
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

// Admin announcement sender
const sendConfirm = async (subject, adminMessage) => {
  try {
    const mailOptions = {
      from: "info@netiqa.co.ke",
      to: 'netiqasolutions@gmail.com',
      cc: ['samson.mburu@netiqa.co.ke', 'isaac.okoth@netiqa.co.ke'],  
      bcc: ['kelvin@netiqa.co.ke'],    
      subject,
      html: `${adminMessage}`, // Appending signature
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending admin email:', error);
    throw new Error(`Error sending admin email: ${error.message}`);
  }
};

// Email sending entry points
const sendWelcomeEmail = async (email, subject, message) => {
  return sendEmail(email, subject, message);
};

const sendForgotPasswordEmail = async ({ email, subject, message }) => {
  return sendEmail(email, subject, message);
};

const sendAnnounceEmail = async ({ subject, message }) => {
  return sendConfirm(subject, message); // fixed param structure
};

module.exports = {
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendAnnounceEmail,
};
