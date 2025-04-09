import DeviceForm from "../components/DeviceForm";
import DeviceStatus from "../components/DeviceStatus";
import ShipmentForm from "../components/ShipDevice";
import ActivationForm from "../components/ActivateDevice";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">📦 Register Device</h2>
        <DeviceForm />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">🚚 Ship Device</h2>
        <ShipmentForm />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">🔐 Activate Device</h2>
        <ActivationForm />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">🔍 Check Device Status</h2>
        <DeviceStatus />
      </div>
    </div>
  );
}
