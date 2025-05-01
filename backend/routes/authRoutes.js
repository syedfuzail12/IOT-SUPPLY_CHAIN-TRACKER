const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware")
const { register, login, getCurrentUser, logout, changePassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware,  logout);
router.post("/change-password",authMiddleware, changePassword);

module.exports = router;
