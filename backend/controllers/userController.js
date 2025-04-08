const { User, Position, BankInfo } = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const path = require("path");  
const { Sequelize } = require('sequelize');
const { sendForgotPasswordEmail } = require('../middlewares/sendEmail');
// Create a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate the input fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: "All fields (email, password and name) are required. 🤷" });
    }
   // Check if email contains the domain specified in the environment variable
  //  const requiredEmailDomain = process.env.EMAIL_CONTAIN;
  //  if (!email.includes(requiredEmailDomain)) {
  //    return res.status(400).json({ 
  //      error: `Email must contain the domain ${requiredEmailDomain}.😇` 
  //    });
  //  }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use 🥶" });
    }

   
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return the newly created user
    res.status(201).json({
      message: "User created successfully 🎉",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    // Email content
    const message = `

     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
       Welcome to Our OnBoard
    </div>
    <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
      <p style="font-size: 16px; color: #333;">Hi <strong>${newUser.name}</strong>,</p>
      <p style="font-size: 16px; color: #555;">We are excited to have you on board. Click the button below to get started:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${process.env.FRONTEND_URL}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
         Get Started
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">If you have any questions, feel free to reach out.</p>
      
      <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; text-align: center;">
        <p style="font-size: 14px; color: #777; margin-bottom: 5px;">Best Regards,</p>
        <p style="font-size: 16px; font-weight: bold; color: #333;">IdeaKode Team</p>
        <p style="font-size: 14px; color: #555;">Email: support@ideacode.com</p>
        <p style="font-size: 14px; color: #555;">Phone: +123 456 7890</p>
        <div style="margin-top: 10px;">
          <a href="https://facebook.com/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook">
          </a>
          <a href="https://twitter.com/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter">
          </a>
          <a href="https://linkedin.com/company/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn">
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
  

    // Send the email (ensure the email function is properly implemented)
    await sendForgotPasswordEmail({
      email: newUser.email,
      subject: "Welcome to our platform 🎉",
      message: message,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while creating the user. Please try again later." });
  }
};


const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }, 
      attributes: { exclude: ['password'] }, 
    });

    if (!user) {
      return res.status(404).json({ error: "User not found 🥶." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while retrieving the current user. Please try again later." });
  }
};




// login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the email and password inputs
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

   // Remove domain if frontend is NOT on .netiqa.co.ke
   res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: "netiqa.co.ke", // Try without the leading dot
    maxAge: 3600000,
    path: '/'
  });

    // Respond with the user data (optionally excluding password)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
     });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, 
    
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const id   = req.user.id;
    const { name, email, password } = req.body;

    // Check if a file was uploaded
    let imageUrl = null;
if (req.file) {
  imageUrl = path.join(`${process.env.BACKEND_URL}/uploads`, req.file.filename);
}


    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found 🥶' });
    }

    // Hash the new password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    // Update the user
    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword,
      image: imageUrl || user.image, 
    });

    res.status(200).json({
      message: "User updated successfully 🎉",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found 🥶' });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully 🥺",});
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email: " + email);

    // Validate the email input
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist." });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token and set expiration time (1 hour)
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    // Save the user with the new reset token and expiry
    await user.save();

    // Create the reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("resetURL: " + resetUrl);

    // Email content
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      Password Reset Request
    </div>
    <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
      <p style="font-size: 16px; color: #333;">Hi <strong>${user.name}</strong>,</p>
      <p style="font-size: 16px; color: #555;">We received a request to reset your password. Click the button below to reset it:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUrl}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">If you did not perform this action, please contact our support team immediately.</p>
      
      <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; text-align: center;">
        <p style="font-size: 14px; color: #777; margin-bottom: 5px;">Best Regards,</p>
        <p style="font-size: 16px; font-weight: bold; color: #333;">IdeaKode Team</p>
        <p style="font-size: 14px; color: #555;">Email: support@ideacode.com</p>
        <p style="font-size: 14px; color: #555;">Phone: +123 456 7890</p>
        <div style="margin-top: 10px;">
          <a href="https://facebook.com/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook">
          </a>
          <a href="https://twitter.com/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter">
          </a>
          <a href="https://linkedin.com/company/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn">
          </a>
        </div>
      </div>
    </div>
  </div>
    `;

    // Send the email
    await sendForgotPasswordEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: message,
    });

    // Send success response
    res.status(200).json({
      message: "Password reset email sent successfully.",
      resetUrl: resetUrl,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ error: error.message || "An error occurred during the password reset process." });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required." });
    }

    // Hash the provided token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user by token and ensure the token has not expired
    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token and expiration
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    const message = `
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px; font-size: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      Password Reset Successful
    </div>
    <div style="padding: 20px; background-color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
      <p style="font-size: 16px; color: #333;">Hi <strong>${user.name}</strong>,</p>
      <p style="font-size: 16px; color: #555;">Your password has been successfully reset. You can now log in with your new password.</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="{{login_url}}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
          Log In
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">If you did not perform this action, please contact our support team immediately.</p>
      
      <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; text-align: center;">
        <p style="font-size: 14px; color: #777; margin-bottom: 5px;">Best Regards,</p>
        <p style="font-size: 16px; font-weight: bold; color: #333;">IdeaKode Team</p>
        <p style="font-size: 14px; color: #555;">Email: support@ideacode.com</p>
        <p style="font-size: 14px; color: #555;">Phone: +123 456 7890</p>
        <div style="margin-top: 10px;">
          <a href="https://facebook.com/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook">
          </a>
          <a href="https://twitter.com/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter">
          </a>
          <a href="https://linkedin.com/company/ideacode" style="text-decoration: none; margin: 0 5px;">
            <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn">
          </a>
        </div>
      </div>
    </div>
  </div>

    
  `;

  await sendForgotPasswordEmail({
    email: user.email,
    subject: "Password Reset Successful",
    text: message,
  });


    res.status(200).json({ message: "Password reset successful. You can now log in with your new password." });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ error: "An error occurred while resetting the password." });
  }
};

// logout
const logout = (req, res) => {
  try {
 
    res.clearCookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });
    
    console.log("Cleared cookie");

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ error: "An error occurred during logout." });
  }
};


module.exports = {getAllUsers,register, getCurrentUser, loginUser, getUserById, updateUser, deleteUser, forgotPassword, resetPassword, logout };