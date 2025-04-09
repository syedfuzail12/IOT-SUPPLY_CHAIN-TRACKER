import { useState } from "react";
import axios from "axios";

const ActivateDevice = () => {
  const [serial, setSerial] = useState("");
  const [owner, setOwner] = useState("");
  const [message, setMessage] = useState("");

  const handleActivate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/device/activate", {
        serial,
        owner,
      });
      setMessage(`✅ Device Activated! TX: ${res.data.txHash}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-2xl mt-8">
      <h2 className="text-xl font-bold mb-4">🔓 Activate Device</h2>

      <input
        type="text"
        placeholder="Enter Serial Number"
        className="w-full p-2 border rounded mb-3"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Owner Address"
        className="w-full p-2 border rounded mb-3"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={handleActivate}
      >
        Activate Device
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ActivateDevice;
