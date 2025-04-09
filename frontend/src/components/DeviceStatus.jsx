import { useState } from "react";
import axios from "axios";

export default function DeviceStatus() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/device/${serial}`);
      setStatus(res.data);
      setError("");
    } catch (err) {
      setError("Device not found or error occurred.");
      setStatus(null);
    }
  };

  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 0: return "Manufactured";
      case 1: return "Shipped";
      case 2: return "Activated";
      default: return "Unknown";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded-2xl">
      <h1 className="text-xl font-bold mb-4">Check Device Status</h1>
      <input
        type="text"
        placeholder="Enter Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={fetchStatus} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Check Status
      </button>

      {status && (
        <div className="mt-4 text-left text-sm text-gray-800">
          <p><strong>Serial:</strong> {serial}</p>
          <p><strong>Status:</strong> {getStatusText(Number(status.status))}</p>
          <p><strong>Registered By:</strong> {status.registeredBy}</p>
          <p><strong>Shipped By:</strong> {status.shipper}</p>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
