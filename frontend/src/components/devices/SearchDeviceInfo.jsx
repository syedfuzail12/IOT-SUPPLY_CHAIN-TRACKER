import React, { useState } from "react";
import useDeviceStore from "../../store/deviceStore";
import { Search, Activity, Box, Truck, User, Calendar, Check, X, Loader2 } from "lucide-react";

const statusMap = {
  "0": { 
    label: "Registered", 
    color: "bg-yellow-500", 
    textColor: "text-yellow-50",
    icon: Box 
  },
  "1": { 
    label: "Shipped", 
    color: "bg-blue-500", 
    textColor: "text-blue-50",
    icon: Truck 
  },
  "2": { 
    label: "Activated", 
    color: "bg-green-500", 
    textColor: "text-green-50",
    icon: Check 
  },
};

const SearchDeviceInfo = () => {
  const { getDeviceBySerial } = useDeviceStore();

  const [searchId, setSearchId] = useState("");
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await getDeviceBySerial(searchId);
      if (result) {
        setDeviceInfo(result);
      } else {
        setDeviceInfo(null);
        setError("No device found with this ID");
      }
    } catch (err) {
      setError("Failed to fetch device information");
      setDeviceInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = deviceInfo && statusMap[deviceInfo.status]?.icon;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity size={20} />
          Device Tracking System
        </h2>
        <p className="text-indigo-100 text-sm mt-1">
          Search for device details using its unique identifier
        </p>
      </div>

      {/* Search Form */}
      <div className="p-6 border-b border-gray-200">
        <form className="flex gap-3" onSubmit={handleSearch}>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Device ID or Serial Number"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchId.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Search</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Area */}
      <div className="p-6">
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="flex flex-col items-center">
              <Loader2 size={36} className="text-indigo-600 animate-spin mb-3" />
              <p className="text-gray-600">Searching for device information...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <div className="p-1 bg-red-100 rounded-full">
              <X size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-red-800 font-medium">{error}</p>
              <p className="text-red-600 text-sm mt-1">
                Please check the device ID and try again
              </p>
            </div>
          </div>
        )}

        {deviceInfo && !loading && (
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200">
            {/* Status Bar */}
            <div className={`${statusMap[deviceInfo.status]?.color || "bg-gray-500"} px-4 py-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {StatusIcon && <StatusIcon size={18} className={statusMap[deviceInfo.status]?.textColor} />}
                <span className={`font-medium ${statusMap[deviceInfo.status]?.textColor || "text-white"}`}>
                  {statusMap[deviceInfo.status]?.label || "Unknown Status"}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full bg-opacity-25 font-medium ${statusMap[deviceInfo.status]?.textColor} bg-white`}>
                #{deviceInfo.serial}
              </span>
            </div>

            {/* Device Info Grid */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500 mb-1">Device ID</div>
                <div className="font-medium text-gray-800 flex items-center gap-2">
                  <Box size={16} className="text-indigo-500" />
                  {deviceInfo.serial || "N/A"}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500 mb-1">Registration Date</div>
                <div className="font-medium text-gray-800 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  {deviceInfo.registrationDate || "N/A"}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500 mb-1">Registered By</div>
                <div className="font-medium text-gray-800 flex items-center gap-2">
                  <User size={16} className="text-indigo-500" />
                  {deviceInfo.registeredBy || "N/A"}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500 mb-1">Shipper</div>
                <div className="font-medium text-gray-800 flex items-center gap-2">
                  <Truck size={16} className="text-indigo-500" />
                  {deviceInfo.shipper || "Not shipped yet"}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200 sm:col-span-2">
                <div className="text-xs font-medium text-gray-500 mb-1">Current Owner</div>
                <div className="font-medium text-gray-800 flex items-center gap-2">
                  <User size={16} className="text-indigo-500" />
                  {deviceInfo.owner || "No owner assigned"}
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="px-4 py-3 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Device History</h3>
              <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                {deviceInfo.status >= 0 && (
                  <div className="relative">
                    <div className="absolute -left-[17px] p-1 rounded-full bg-yellow-500">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm pl-4">
                      <div className="font-medium text-gray-900">Device Registered</div>
                      <div className="text-xs text-gray-500">By {deviceInfo.registeredBy || "Unknown"}</div>
                    </div>
                  </div>
                )}
                
                {deviceInfo.status >= 1 && (
                  <div className="relative">
                    <div className="absolute -left-[17px] p-1 rounded-full bg-blue-500">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm pl-4">
                      <div className="font-medium text-gray-900">Device Shipped</div>
                      <div className="text-xs text-gray-500">By {deviceInfo.shipper || "Unknown"}</div>
                    </div>
                  </div>
                )}
                
                {deviceInfo.status >= 2 && (
                  <div className="relative">
                    <div className="absolute -left-[17px] p-1 rounded-full bg-green-500">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm pl-4">
                      <div className="font-medium text-gray-900">Device Activated</div>
                      <div className="text-xs text-gray-500">By {deviceInfo.owner || "Unknown"}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!deviceInfo && !loading && !error && searchId.trim() === "" && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <Search size={24} className="text-indigo-600" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Search for a Device</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Enter a device ID or serial number above to view its details and tracking information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDeviceInfo;