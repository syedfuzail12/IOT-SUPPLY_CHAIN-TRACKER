// src/components/devices/CustomerPanel.jsx
import React, { useState } from "react";
import useDeviceStore from "../../store/deviceStore";

const CustomerPanel = () => {
  const { activateDevice } = useDeviceStore();
  const [activateId, setActivateId] = useState("");

  const handleActivateSubmit = async (e) => {
    e.preventDefault();
    if (!activateId) return;

    await activateDevice(activateId);
    setActivateId("");
  };

  return (
    <form
      onSubmit={handleActivateSubmit}
      className="bg-white p-6 rounded shadow space-y-4 max-w-md"
    >
      <h2 className="text-lg font-semibold">Activate Your Device</h2>
      <input
        type="text"
        value={activateId}
        onChange={(e) => setActivateId(e.target.value)}
        placeholder="Enter Your Device ID"
        className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Activate Device
      </button>
    </form>
  );
};

export default CustomerPanel;
