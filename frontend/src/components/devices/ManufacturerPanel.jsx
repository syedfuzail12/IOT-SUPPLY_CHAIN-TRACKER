import React, { useState } from "react";
import useDeviceStore from "../../store/deviceStore";
import { X, Plus, Scan, Tag, Loader2, Check } from "lucide-react";

const ManufacturerPanel = () => {
  const { registerDevice } = useDeviceStore();
  const [showModal, setShowModal] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [deviceType, setDeviceType] = useState("sensor");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setDeviceName("");
    setDeviceId("");
    setDeviceType("sensor");
    setShowModal(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!deviceId || !deviceName) return;

    setLoading(true);
    try {
      const result = await registerDevice(deviceId);
      
      if (result?.success) {
        setSuccessAnimation(true);
        setTimeout(() => {
          setSuccessAnimation(false);
          handleCloseModal();
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to register device:", error);
    } finally {
      setLoading(false);
    }
  };

  const deviceTypes = [
    { id: "sensor", label: "Sensor" },
    { id: "actuator", label: "Actuator" },
    { id: "gateway", label: "Gateway" },
    { id: "camera", label: "Camera" }
  ];

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors duration-200 flex items-center gap-2 shadow-md"
      >
        <Plus size={18} />
        Register New Device
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div 
            className="bg-white rounded-xl w-[90%] sm:w-[500px] shadow-2xl transform transition-all" 
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            {/* Modal header */}
            <div className="bg-indigo-600 rounded-t-xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Register New Device</h2>
              <button
                className="text-white hover:text-indigo-200 transition-colors p-1 rounded-full hover:bg-indigo-500"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              {successAnimation ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-800">Device Registered Successfully!</p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleRegisterSubmit}>
                  {/* Device Type */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Device Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {deviceTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setDeviceType(type.id)}
                          className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-200
                            ${deviceType === type.id
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300"
                            }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Device Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Device Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Temperature Sensor X200"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Device ID */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Device ID</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Scan size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Unique device identifier"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      This ID must be unique across all devices in the system
                    </p>
                  </div>
                  
                  {/* Optional metadata */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Details (Optional)</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-600">Firmware Version</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="e.g., v1.0.2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-600">Serial Number</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="e.g., SN12345678"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Registering...</span>
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          <span>Register Device</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManufacturerPanel;