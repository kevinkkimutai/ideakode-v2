const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Retrieve token from cookies or authorization header
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized. Token not found. 😱" });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database
      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Check if the user has the required role
      if (user.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden. Insufficient permissions. 🥶" });
      }

      // Attach user to the request object and proceed
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in verifyRole middleware:", error.message);
      res.status(500).json({ error: "An error occurred while verifying the role. ⚠️" });
    }
  };
};

module.exports = { verifyRole };
