const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection (for user auth)
mongoose
  .connect(`${process.env.MONGO_URI}/iot_supply_chain`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/device", deviceRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
