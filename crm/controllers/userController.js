const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const jwtConfig = require('../config/config');
const { sendAccountVerificationEmail, sendForgotPasswordEmail, sendForgotPasswordSuccessEmail } = require('../middleware/sendEmail');
const crypto = require('crypto');
const { uploadToR2, deleteFromR2 } = require('../middleware/uploadImage');
const logger = require('../utils/logger');

const register = async (req, res) => {
    const { first_name, last_name, email, password, roleId } = req.body;
    console.log("body", req.body);
    

    try {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email already in use' });

      const role = await Role.findByPk(roleId);  
      if (!role) return res.status(409).json({ message: 'Role not found 🥶!' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user first (no verificationToken yet)
      const user = await User.create({ first_name, last_name, email, password: hashedPassword, roleId });
  
      // Now generate a verification token using the user data
      const verificationToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtConfig.secret,
        { expiresIn: '1h' }
      );
      
  
      // Update the user with the token
      await user.update({ verificationToken });
  
      // Create the verification link
      const verificationUrl = `${process.env.APP_URL}/verify-account?token=${verificationToken}`;
  
      // Email content
      const subject = 'Account Verification';

     await sendAccountVerificationEmail(user, verificationUrl);
  
  
      res.status(201).json({
        message: 'User created. Please check your email to verify your account.',
        user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.Role.role_name },
      });
  
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      
      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: Role, 
            as: 'Role',  
          }
        ]
      });
  
      
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
  
      // Update last_login timestamp and is_active status to current time
      const currentTime = new Date();
      await user.update({ 
        last_login: currentTime,
        is_active: true
      });
  
      const token = jwt.sign(
          { id: user.id, email: user.email, role: user.Role.role_name }, // Ensure Role.role_name is used
          jwtConfig.secret,
          { expiresIn: jwtConfig.expiresIn }
        );
        
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          first_name: user.first_name, 
          last_name: user.last_name, 
          email: user.email, 
          image: user.image,
          last_login: currentTime,
          is_active: user.is_active,
          isVerified: user.isVerified, 
          role: user.Role.role_name 
        } 
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

const Verification = async (req, res) => {
    try {
      const token = req.params.token;

      if (!token) return res.status(400).json({ message: 'Verification token is required' });
  
      const decoded = jwt.verify(token, jwtConfig.secret);
      const user = await User.findOne({ where: { id: decoded.id, email: decoded.email } });
  
      if (!user) return res.status(404).json({ message: 'User not found or token invalid' });
      if (user.isVerified) return res.status(200).json({ message: 'Account already verified' });
  
      await user.update({ isVerified: true });
      res.status(200).json({ message: 'Account verified successfully' });
  
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Verification link has expired' });
      }
      res.status(500).json({ message: 'Verification failed', error: error.message });
    }
  };

  const resendVerificationToken = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (user.isVerified) return res.status(400).json({ message: 'Account already verified' });
  
      // Generate new token
      const newToken = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
        expiresIn: '1h',
      });
  
      await user.update({ verificationToken: newToken });
  
      const verificationUrl = `${process.env.APP_URL}/verify-account?token=${newToken}`;
      const subject = 'New Verification Link';

     await sendAccountVerificationEmail(user, verificationUrl);
  
  
      res.status(200).json({ message: 'New verification link sent to your email' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) return res.status(404).json({ message: 'No user with that email found' });
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour from now
  
      await user.update({
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(resetTokenExpires),
      });
  
      const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
      await sendForgotPasswordEmail(user, resetUrl);
  
      res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Reset Password
  const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [require('sequelize').Op.gt]: new Date() },
        },
      });
  
      if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await user.update({
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      await sendForgotPasswordSuccessEmail(user);
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

const profile = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role, 
        as: 'Role',  
        attributes: ['id', 'role_name'] 
      }
    ],
    attributes: { exclude: ['password', 'verificationToken', 'resetPasswordToken', 'resetPasswordExpires'] }
  });
  res.json({ user });
};


const updateUser = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Initialize updatedData with empty object
    let updatedData = {};
    
    // Only extract from req.body if it exists
    if (req.body) {
      const { first_name, last_name, email, roleId } = req.body;
      
      // Add properties to updatedData only if they exist in req.body
      if (first_name !== undefined) updatedData.first_name = first_name;
      if (last_name !== undefined) updatedData.last_name = last_name;
      if (email !== undefined) updatedData.email = email;
      if (roleId !== undefined) {
        // If roleId is provided, validate it
        const role = await Role.findByPk(roleId);
        if (!role) return res.status(400).json({ message: 'Invalid roleId' });
        updatedData.roleId = roleId;
      }
    }

    // Handle image update independent of other data
    if (req.file) {
      try {
        // Delete old image if exists
        if (user.image) {
          await deleteFromR2(user.image).catch(e => 
            logger.warn("Old image deletion warning:", e.message)
          );
        }
        // Upload new image and add to updatedData
        updatedData.image = await uploadToR2(req.file);
      } catch (uploadError) {
        return res.status(400).json({ error: uploadError.message });
      }
    }

    // Only perform update if there's something to update
    if (Object.keys(updatedData).length > 0) {
      await user.update(updatedData);
      return res.status(200).json({ 
        message: 'User updated successfully', 
        user: await User.findByPk(id) // Get fresh user data
      });
    } else {
      return res.status(400).json({ message: 'No update data provided' });
    }
    
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// get alluser
const allUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'Role',
          attributes: ['id', 'role_name'] 
        }
      ],
      attributes: { exclude: ['password', 'verificationToken', 'resetPasswordToken', 'resetPasswordExpires'] }
    });

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = { profile, login, register, Verification, resendVerificationToken, forgotPassword, resetPassword, updateUser, allUsers};