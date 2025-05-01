import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import useAuthStore from "../../store/authStore";
import useDeviceStore from "../../store/deviceStore";
import { Package, Truck, Users, AlertCircle, Check, Clock } from "lucide-react";

const DashboardHome = () => {
  const { user } = useAuthStore();
  const { fetchUserDevices, devices, loading } = useDeviceStore();
  const [stats, setStats] = useState({
    shipped: 0,
    manufactured: 0,
    delivered: 0,
    pending: 0
  });

  useEffect(() => {
    fetchUserDevices();
  }, [fetchUserDevices]);

  useEffect(() => {
    if (devices) {
      const shippedCount = devices.filter((device) => device.status === 1).length;
      const manufacturedCount = devices.filter((device) => device.status === 0).length;
      const deliveredCount = devices.filter((device) => device.status === 2).length;
      const pendingCount = devices.filter((device) => device.status === 3).length;
      
      setStats({
        shipped: shippedCount,
        manufactured: manufacturedCount,
        delivered: deliveredCount,
        pending: pendingCount
      });
    }
  }, [devices]);

  const chartData = [
    { name: "Manufactured", value: stats.manufactured, color: "#3b82f6" },
    { name: "Shipped", value: stats.shipped, color: "#10b981" },
    { name: "Delivered", value: stats.delivered, color: "#8b5cf6" },
    { name: "Pending", value: stats.pending, color: "#f59e0b" }
  ];

  const renderStatusCard = (title, value, icon, color, bgColor) => (
    <div className={`bg-white shadow-md rounded-2xl overflow-hidden border-l-4 ${color}`}>
      <div className="p-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">{title}</h2>
          <p className={`text-2xl font-bold mt-1 ${color.replace('border-', 'text-')}`}>
            {loading ? "..." : value}
          </p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 text-blue-700 text-sm">
          <Clock size={16} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatusCard(
          "Total Devices", 
          devices?.length || 0, 
          <Package size={24} className="text-blue-500" />, 
          "border-blue-500", 
          "bg-blue-50"
        )}
        {renderStatusCard(
          "Shipped", 
          stats.shipped, 
          <Truck size={24} className="text-green-500" />, 
          "border-green-500", 
          "bg-green-50"
        )}
        {renderStatusCard(
          "Delivered", 
          stats.delivered, 
          <Check size={24} className="text-purple-500" />, 
          "border-purple-500", 
          "bg-purple-50"
        )}
        {renderStatusCard(
          "Pending", 
          stats.pending, 
          <AlertCircle size={24} className="text-amber-500" />, 
          "border-amber-500", 
          "bg-amber-50"
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow-md rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Device Status Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                <XAxis dataKey="name" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <rect key={`rect-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-700">Account Info</h2>
            <div className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${user?.role === 'manufacturer' ? 'bg-blue-100 text-blue-700' :
                user?.role === 'shipper' ? 'bg-green-100 text-green-700' :
                'bg-purple-100 text-purple-700'}
            `}>
              {user?.role}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{user?.name}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Package size={16} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Your Devices</div>
                <div className="font-medium">{devices?.length || 0}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-2">Device Completion</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${devices?.length ? (stats.delivered / devices.length) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{Math.round(devices?.length ? (stats.delivered / devices.length) * 100 : 0)}% Complete</span>
                <span>{stats.delivered} / {devices?.length || 0} Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;