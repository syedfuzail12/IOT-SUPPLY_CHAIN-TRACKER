import { useState } from "react";
import axios from "axios";

export default function DeviceForm() {
  const [serial, setSerial] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/device/register", { serial });
      setMessage("✅ Registered: " + res.data.txHash);
    } catch (err) {
      setMessage("❌ Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded-2xl">
      <h1 className="text-xl font-bold mb-4">Register Device</h1>
      <input
        type="text"
        placeholder="Enter Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleRegister} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Register
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
