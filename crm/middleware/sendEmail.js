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
const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
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

// Email template for password reset
const generatePasswordResetSuccessEmail = (user) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        Password Reset Successful
      </div>
      <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${user.name}</strong>,</p>
        <p style="font-size: 16px; color: #555;">Your password has been successfully reset. You can now log in with your new password.</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://www.admin.netiqa.co.ke" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
            Log In
          </a>
        </div>
        <p style="font-size: 14px; color: #777;">If you did not perform this action, please contact our support team immediately.</p>
        
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
const generatePasswordResetEmail = (user, resetUrl) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          Password Reset 
        </div>
        <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
          <p style="font-size: 16px; color: #333;">Hi <strong>${user.name}</strong>,</p>
          <p style="font-size: 16px; color: #555;">We received a request to reset your password. Click the button below to reset it:<</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #777;">If you did not perform this action, please contact our support team immediately.</p>
          
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


// account Verification

const generateAccountVerificationEmail = (user, verificationUrl) => {
    return `
       <div style="background-color:#f4f4f4;border-radius:8px;padding:0 0;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);">
            <div style="background-color:#4CAF50;color:#fff;padding:20px;text-align:center;">
              <h2 style="margin:0;font-size:24px;">Account Verification</h2>
            </div>
            <div style="padding:30px;">
              <p style="font-size: 16px; color: #333;">Hi <strong>${user.name}</strong>,</p>
          <p style="font-size: 16px; color: #555;">Thank you for registering! To complete your registration and verify your account, please click the button below.</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
              Verify Account
            </a>
          </div>
          <p style="font-size: 14px; color: #777;">If you did not create an account with us, please ignore this email.</p>
          
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
  };
  
  const sendAccountVerificationEmail = async (user, verificationUrl) => {
    const subject = 'Account Verification';
    const message = generateAccountVerificationEmail(user, verificationUrl);
    
    return sendEmail(user.email, subject, message);
  };

  
// Email sending entry points
const sendWelcomeEmail = async (email, subject, message) => {
  return sendEmail(email, subject, message);
};

const sendForgotPasswordSuccessEmail = async ( user ) => {
  const subject = 'Password Reset Successful';
  const message = generatePasswordResetSuccessEmail(user);

  return sendEmail(user.email, subject, message);
};

const sendForgotPasswordEmail = async ( user, resetUrl ) => {
    const subject = 'Password Reset';
    const message = generatePasswordResetEmail(user, resetUrl);
  
    return sendEmail(user.email, subject, message);
  };

const sendAnnounceEmail = async ({ subject, message }) => {
  return sendConfirm(subject, message);
};

module.exports = {
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendForgotPasswordSuccessEmail,
  sendAnnounceEmail,
  sendAccountVerificationEmail,
};
