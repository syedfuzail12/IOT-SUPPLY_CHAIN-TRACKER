import React, { useEffect } from "react";
import useDeviceStore from "../../store/deviceStore";
import useAuthStore from "../../store/authStore";

// Role-based Panels
import ManufacturerPanel from "../../components/devices/ManufacturerPanel";
import ShipperPanel from "../../components/devices/ShipperPanel";
import CustomerPanel from "../../components/devices/CustomerPanel";

// Shared Components
import SearchDeviceInfo from "../../components/devices/SearchDeviceInfo";
import DeviceTable from "../../components/devices/DeviceTable";

const Devices = () => {
  const { devices, fetchDevices, updateDeviceStatus, activateDevice } = useDeviceStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) fetchDevices();
  }, [user, fetchDevices]);

  const handleStatusChange = (deviceId, newStatus) => {
    updateDeviceStatus(deviceId, newStatus);
  };

  const handleActivate = (deviceId) => {
    activateDevice(deviceId);
  };

  return (
    <div className="space-y-8">
      <SearchDeviceInfo />

      {user?.role === "manufacturer" && <ManufacturerPanel />}
      {user?.role === "shipper" && <ShipperPanel />}
      {user?.role === "customer" && <CustomerPanel />}

      <DeviceTable
        devices={devices || []}
        role={user?.role}
        handleStatusChange={handleStatusChange}
        handleActivate={handleActivate}
      />
    </div>
  );
};

export default Devices;
