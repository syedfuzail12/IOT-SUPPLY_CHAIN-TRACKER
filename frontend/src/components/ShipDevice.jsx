// src/components/ShipDevice.jsx
import { useState } from "react";
import axios from "axios";

const ShipDevice = () => {
  const [serial, setSerial] = useState("");
  const [shipper, setShipper] = useState("");
  const [message, setMessage] = useState("");

  const handleShip = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/device/ship", {
        serial,
        shipper,
      });
      setMessage(`✅ Device Shipped! TX: ${res.data.txHash}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-2xl mt-8">
      <h2 className="text-xl font-bold mb-4">📦 Ship a Device</h2>

      <input
        type="text"
        placeholder="Enter Serial Number"
        className="w-full p-2 border rounded mb-3"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Shipper Address"
        className="w-full p-2 border rounded mb-3"
        value={shipper}
        onChange={(e) => setShipper(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleShip}
      >
        Mark as Shipped
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ShipDevice;
