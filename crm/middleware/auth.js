const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtConfig = require('../config/config');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
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
          as: 'role',  
        }
      ]
    });

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


const authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient role' });
      }
      next();
    };
  };


module.exports = {auth, authorizeRole}