const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
try {
  const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  
      next(); 
    } catch (error) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
  
} catch (error) {
  res.status(500).json({ error: error.message });
}
};

module.exports = authenticate;
