const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "No authentication token provided" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      isAdmin: decoded.isAdmin
    };
    
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ 
      success: false,
      message: err.message || "Invalid or expired token" 
    });
  }
};

module.exports = authenticateToken;