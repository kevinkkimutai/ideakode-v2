// const nodemailer = require('nodemailer');

// // Create the transport with your SMTP details
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false,  // Set to 'true' for port 465, 'false' for others like 2525
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
//   // Email signature (can be customized)
//   const signature = `
//     <br><br>
//     Best Regards,<br>
//     The Cinab Team<br>
//     <a href="https://cinab.co.ke">Visit our website</a>
//   `;

// // Function to send a welcome email with signature
// const sendWelcomeEmail = async (email, subject, text) => {


//   // Email content with signature added at the end
//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject,
//     html: `${message}${signature}`,
//   };

//   try {
//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent!');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };
// const sendAnnounceEmail = async (email, subject, message) => {
//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject,
//     html: `${message}${signature}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent!");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// const sendForgotPasswordEmail = async ({ email, subject, message }) => {

//   try {
//     const mailOptions = {
//       from: process.env.SMTP_USER,
//       to: email,
//       subject,
//       html: `${message}${signature}`,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     throw new Error(`Error sending email: ${error.message}`);
//   }
// };


// module.exports = { sendWelcomeEmail, sendForgotPasswordEmail, sendAnnounceEmail };


const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Email signature (can be customized)
const signature = `
  <br><br>
  <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
      Best Regards,<br>
  The IdeaKode Team<br>
  <a href="https://ideakode.vercel.com">Visit our website</a>
    </div>
  
`;

const sendEmail = async (email, subject, message) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject,
      html: `${message}`,
    });
    console.log('Email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

const sendWelcomeEmail = async (email, subject, message) => {
  return sendEmail(email, subject, message);
};

const sendAnnounceEmail = async (email, subject, message) => {
  return sendEmail(email, subject, message);
};

const sendForgotPasswordEmail = async ({ email, subject, message }) => {
  return sendEmail(email, subject, message);
};

module.exports = { sendWelcomeEmail, sendForgotPasswordEmail, sendAnnounceEmail };
