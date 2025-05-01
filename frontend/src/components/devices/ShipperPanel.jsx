// src/components/devices/ShipperPanel.jsx
import React, { useState } from "react";
import useDeviceStore from "../../store/deviceStore";

const ShipperPanel = () => {
  const { shipDevice } = useDeviceStore();
  const [shipSerial, setShipSerial] = useState("");

  const handleShipSubmit = async (e) => {
    e.preventDefault();
    if (!shipSerial) return;

    await shipDevice(shipSerial);
    setShipSerial("");
  };

  return (
    <form
      onSubmit={handleShipSubmit}
      className="bg-white p-6 rounded shadow space-y-4 max-w-md"
    >
      <h2 className="text-lg font-semibold">Ship a Device</h2>
      <input
        type="text"
        value={shipSerial}
        onChange={(e) => setShipSerial(e.target.value)}
        placeholder="Enter Device Serial ID"
        className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Mark as Shipped
      </button>
    </form>
  );
};

export default ShipperPanel;
