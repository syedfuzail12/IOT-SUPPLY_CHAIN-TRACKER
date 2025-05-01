const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
