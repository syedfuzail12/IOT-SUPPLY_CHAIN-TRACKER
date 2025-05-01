const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret for signing JWT
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

// Register Controller
exports.register = async (req, res) => {
  //check already session is running
  const token = req.cookies.token; 
  if(token) return res.status(400).json({message: "session is not expired "})

  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email:newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({ role: newUser.role, name: newUser.name });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  //check already session is running
  const token = req.cookies.token; 
  if(token) return res.status(400).json({message: "session is not expired "})

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email:user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ role: user.role, name: user.name });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get Current User Controller
exports.getCurrentUser = async (req, res) => {
  const user = req.user;

  return res.status(201).json(user);
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

//change password controller
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Old Password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to change password" });
    }

    return res.status(200).json({
      message: "Password changed successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error("Error while changing password", error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};

