const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    serial: { type: String, required: true, unique: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shipper: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    blockchainTxHash: { type: String, required: true },
    status: { type: Number, enum: [0, 1, 2], default: 0 }, // 0=registered, 1=shipped, 2=activated
}, { timestamps: true });

module.exports = mongoose.model("Device", deviceSchema);
