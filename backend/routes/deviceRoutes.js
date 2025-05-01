const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../middleware/authMiddleware")
const {
  registerDevice,
  shipDevice,
  activateDevice,
  getDevice,
  getAllDevicesByRole,
} = require("../controllers/deviceController");
const auth = require("../middleware/authMiddleware"); // ⬅️ middleware for req.user

router.get("/",authMiddleware, getAllDevicesByRole)
router.post("/register", authMiddleware, registerDevice);
router.post("/ship", authMiddleware, shipDevice);
router.post("/activate", authMiddleware, activateDevice);
router.get("/:serial", getDevice);

module.exports = router;
/** 
const express = require("express");
const router = express.Router();
const contract = require("../config/blockchain");

// Register device
router.post("/register", async (req, res) => {
  const { serial } = req.body;
  try {
    const tx = await contract.registerDevice(serial);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ship device
// @route   POST /api/device/ship
// @desc    Mark device as shipped
router.post("/ship", async (req, res) => {
    const { serial, shipper } = req.body;
  
    try {
      const tx = await contract.updateShipment(serial, shipper);
      await tx.wait();
  
      res.json({
        success: true,
        message: "Device marked as shipped.",
        txHash: tx.hash,
      });
    } catch (err) {
      console.error("Shipment update error:", err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  

// Activate device
router.post("/activate", async (req, res) => {
    const { serial, owner } = req.body;
  
    try {
      const tx = await contract.activateDevice(serial, { from: owner });
      await tx.wait();
      res.json({ success: true, txHash: tx.hash });
    } catch (err) {
      console.error("Activation error:", err);
      res.status(500).json({ error: "Activation failed" });
    }
  });
  

// Get device status
router.get("/:serial", async (req, res) => {
    const serial = req.params.serial;
    console.log("GET request for serial:", serial);
    try {
      const result = await contract.getDevice(serial);
  
      const device = {
        serial: result[0],
        registeredBy: result[1],
        shipper: result[2],
        owner: result[3],
        status: result[4].toString(),  // 👈 Convert BigInt enum to string
        exists: result[5],
      };
  
      if (!device.exists) {
        return res.status(404).json({ error: "Device not found" });
      }
  
      res.json(device);
    } catch (err) {
      console.error("Error fetching device:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;


*/