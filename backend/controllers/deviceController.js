const mongoose = require("mongoose");
const { contract, walletAddress } = require("../config/blockchain");
const Device = require("../models/Device.js");
const User = require("../models/User.js");

exports.registerDevice = async (req, res) => {
    const { serial } = req.body;
    const user = req.user;

    try {
        if (user.role !== "manufacturer") {
            return res.status(403).json({ error: "Unauthorized: Only manufacturers can register devices." });
        }

        const device = await contract.getDevice(serial);
        const exists = device[5];
        if (exists) {
            return res.status(400).json({ error: "Device with this ID already exists on blockchain." });
        }

        const tx = await contract.registerDevice(serial);
        await tx.wait();

        // ✅ Save to MongoDB with all required fields
        const newDevice = new Device({
            serial,
            manufacturer: user.userId,
            status: 0,
            blockchainTxHash: tx.hash,
        });
        await newDevice.save();

        res.json({ success: true, txHash: tx.hash });
    } catch (err) {
        console.error("❌ Register Error:", err);
        res.status(500).json({ error: err.message });
    }
};


exports.shipDevice = async (req, res) => {
    const { serial } = req.body;
    const user = req.user;

    if (!user || user.role !== "shipper") {
        return res.status(403).json({ error: "Unauthorized: Only shippers can ship devices." });
    }

    try {
        const device = await contract.getDevice(serial);

        if (!device[5] || device[4].toString() !== "0") {
            return res.status(400).json({ error: "Device not found or already shipped." });
        }

        const tx = await contract.updateShipment(serial, walletAddress);
        await tx.wait();

        // Update MongoDB
        await Device.findOneAndUpdate(
            { serial },
            {
                shipper: user._id,
                status: 1, // 1 = shipped
            }
        );

        res.json({
            success: true,
            message: "Device marked as shipped.",
            txHash: tx.hash,
        });
    } catch (err) {
        console.error("❌ Shipping Error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.activateDevice = async (req, res) => {
    const { serial } = req.body;
    const user = req.user;

    if (!user || user.role !== "customer") {
        return res.status(403).json({ error: "Unauthorized: Only customers can activate devices." });
    }

    try {
        const device = await contract.getDevice(serial);

        if (!device[5] || device[4].toString() !== "1") {
            return res.status(400).json({ error: "Device not found or not yet shipped." });
        }

        const tx = await contract.activateDevice(serial);
        await tx.wait();

        // Update MongoDB
        await Device.findOneAndUpdate(
            { serial },
            {
                customer: user._id,
                status: 2, // 2 = activated
            }
        );

        res.json({
            success: true,
            message: "Device successfully activated.",
            txHash: tx.hash,
        });
    } catch (err) {
        console.error("❌ Activation Error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getDevice = async (req, res) => {
    const serial = req.params.serial;
    try {
        const result = await contract.getDevice(serial);
        const device = {
            serial: result[0],
            registeredBy: result[1],
            shipper: result[2],
            owner: result[3],
            status: result[4].toString(),
            exists: result[5],
        };

        if (!device.exists) {
            return res.status(404).json({ error: "Device not found" });
        }

        res.json(device);
    } catch (err) {
        console.error("❌ Get Device Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllDevicesByRole = async (req, res) => {
    const user = req.user;
    const userId = user._id || user.userId; // Fix: handle both cases

    try {
        let filter = {};

        if (user.role === "manufacturer") {
            filter = { manufacturer: new mongoose.Types.ObjectId(userId) };
        } else if (user.role === "shipper") {
            filter = { shipper: new mongoose.Types.ObjectId(userId) };
        } else if (user.role === "customer") {
            filter = { customer: new mongoose.Types.ObjectId(userId) };
        }

        const devices = await Device.find(filter).populate("manufacturer shipper customer");


        res.json(devices);
    } catch (err) {
        console.error("❌ Fetch Devices Error:", err);
        res.status(500).json({ error: "Failed to fetch devices" });
    }
};
