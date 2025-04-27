const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const jwtConfig = require('../config/config');
const { sendAccountVerificationEmail, sendForgotPasswordEmail, sendForgotPasswordSuccessEmail } = require('../middleware/sendEmail');
const crypto = require('crypto');

const register = async (req, res) => {
    const { first_name, last_name, email, password, roleId } = req.body;

    try {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email already in use' });

      const role = await Role.findByPk(roleId);  
      if (!role) return res.status(409).json({ message: 'Role not found 🥶!' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user first (no verificationToken yet)
      const user = await User.create({ first_name, last_name, email, password: hashedPassword, role });
  
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
        user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, user: user.role },
      });
  
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("user", req.body);
    
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role, 
          as: 'role',  
        }
      ]
    });

    console.log("userlogin", user);
    
    
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role.name },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );
      

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const Verification = async (req, res) => {
    try {
      const token = req.param;
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
  const user = req.user;
  res.json({ user });
};

module.exports = { profile, login, register, Verification, resendVerificationToken, forgotPassword, resetPassword};