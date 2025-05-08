const jwt = require('jsonwebtoken');
const { User, Role } = require('../models'); // Added Role import
const jwtConfig = require('../config/config');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer'))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    // Use the same secret key as in the login function
    const decoded = jwt.verify(token, jwtConfig.secret); 
    
    const user = await User.findByPk(decoded.id, {
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'roleId',
        'isVerified'
      ],
      include: [
        {
          model: Role, 
          as: 'Role',  // Changed from 'role' to 'Role' to match login function
        }
      ]
    });

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};


const authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.Role || !roles.includes(req.user.Role.role_name)) { // Updated to use Role.role_name
        return res.status(403).json({ message: 'Access denied: Insufficient role' });
      }
      next();
    };
  };


module.exports = {auth, authorizeRole}