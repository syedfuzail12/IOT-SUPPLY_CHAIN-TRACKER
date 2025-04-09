const express = require("express");
const cors = require("cors");
require("dotenv").config();

const deviceRoutes = require("./routes/deviceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/device", deviceRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
