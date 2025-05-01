import React, { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, 
  Tooltip, ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area
} from "recharts";
import { 
  TrendingUp, AlertCircle, Clock, Calendar, ArrowUpRight, 
  ArrowDownRight, Package, Truck, Check, Users, Filter
} from "lucide-react";
import useDeviceStore from "../../store/deviceStore";
import useAuthStore from "../../store/authStore";

const DeviceAnalytics = () => {
  const { user } = useAuthStore();
  const { fetchUserDevices, devices, loading } = useDeviceStore();
  const [timeRange, setTimeRange] = useState("month");
  const [viewMode, setViewMode] = useState("overview");
  
  // Statistics state
  const [stats, setStats] = useState({
    manufactured: 0,
    shipped: 0,
    delivered: 0,
    pending: 0,
    growthRate: 12.3, // Sample data
    issueRate: 2.1,   // Sample data
  });

  // Monthly data (sample data)
  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", manufactured: 12, shipped: 10, delivered: 8, pending: 2 },
    { month: "Feb", manufactured: 18, shipped: 15, delivered: 12, pending: 3 },
    { month: "Mar", manufactured: 22, shipped: 20, delivered: 17, pending: 2 },
    { month: "Apr", manufactured: 26, shipped: 23, delivered: 21, pending: 2 },
    { month: "May", manufactured: 32, shipped: 28, delivered: 25, pending: 4 },
    { month: "Jun", manufactured: 38, shipped: 35, delivered: 30, pending: 3 },
  ]);

  // Distribution data (derived from devices)
  const [distributionData, setDistributionData] = useState([]);

  useEffect(() => {
    fetchUserDevices();
  }, [fetchUserDevices]);

  useEffect(() => {
    if (devices) {
      const manufacturedCount = devices.filter((device) => device.status === 0).length;
      const shippedCount = devices.filter((device) => device.status === 1).length;
      const deliveredCount = devices.filter((device) => device.status === 2).length;
      const pendingCount = devices.filter((device) => device.status === 3).length;
      
      setStats({
        ...stats,
        manufactured: manufacturedCount,
        shipped: shippedCount,
        delivered: deliveredCount,
        pending: pendingCount,
      });

      setDistributionData([
        { name: "Manufactured", value: manufacturedCount, color: "#3b82f6" },
        { name: "Shipped", value: shippedCount, color: "#10b981" },
        { name: "Delivered", value: deliveredCount, color: "#8b5cf6" },
        { name: "Pending", value: pendingCount, color: "#f59e0b" },
      ]);
    }
  }, [devices]);

  // Performance Metrics (sample data)
  const performanceData = [
    { metric: "Avg. Manufacturing Time", value: "2.3 days", change: 5.2, improving: true },
    { metric: "Avg. Shipping Time", value: "3.7 days", change: -2.1, improving: false },
    { metric: "Delivery Success Rate", value: "97.8%", change: 1.5, improving: true },
    { metric: "Device Activation Rate", value: "94.2%", change: 3.2, improving: true },
  ];

  // Time series data for the selected time range (sample data)
  const getTimeSeriesData = () => {
    if (timeRange === "week") {
      return [
        { day: "Mon", devices: 5 },
        { day: "Tue", devices: 8 },
        { day: "Wed", devices: 7 },
        { day: "Thu", devices: 10 },
        { day: "Fri", devices: 12 },
        { day: "Sat", devices: 6 },
        { day: "Sun", devices: 4 },
      ];
    } else if (timeRange === "month") {
      return [
        { date: "Week 1", devices: 22 },
        { date: "Week 2", devices: 28 },
        { date: "Week 3", devices: 32 },
        { date: "Week 4", devices: 38 },
      ];
    } else {
      return monthlyData.map(item => ({
        date: item.month,
        devices: item.manufactured,
      }));
    }
  };

  const renderStatsCard = (title, value, icon, color, bgColor, changeValue = null, improving = null) => (
    <div className={`bg-white shadow-sm rounded-xl overflow-hidden border-l-4 ${color}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className={`${bgColor} p-2 rounded-lg`}>
            {icon}
          </div>
          {changeValue !== null && (
            <div className={`flex items-center text-sm ${improving ? 'text-green-600' : 'text-red-600'}`}>
              {improving ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(changeValue)}%</span>
            </div>
          )}
        </div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className={`text-2xl font-bold mt-1 ${color.replace('border-', 'text-')}`}>
          {loading ? "..." : value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Device Analytics</h1>
          <p className="text-gray-500">Comprehensive analysis of your IoT device lifecycle</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 text-blue-700 text-sm">
            <Clock size={16} />
            <span>Updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <select 
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderStatsCard(
          "Total Devices", 
          devices?.length || 0, 
          <Package size={20} className="text-blue-500" />, 
          "border-blue-500", 
          "bg-blue-50",
          stats.growthRate,
          true
        )}
        {renderStatsCard(
          "Shipped", 
          stats.shipped, 
          <Truck size={20} className="text-green-500" />, 
          "border-green-500", 
          "bg-green-50"
        )}
        {renderStatsCard(
          "Delivered", 
          stats.delivered, 
          <Check size={20} className="text-purple-500" />, 
          "border-purple-500", 
          "bg-purple-50"
        )}
        {renderStatsCard(
          "Issue Rate", 
          `${stats.issueRate}%`, 
          <AlertCircle size={20} className="text-amber-500" />, 
          "border-amber-500", 
          "bg-amber-50",
          -0.8,
          true
        )}
      </div>

      {/* View Mode Selector */}
      <div className="bg-white rounded-lg p-2 shadow-sm flex justify-center mt-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "overview" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("overview")}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "performance" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("performance")}
          >
            Performance
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "distribution" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("distribution")}
          >
            Distribution
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="bg-white shadow-sm rounded-xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-700">Device Production Trend</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>{timeRange === "week" ? "Last 7 days" : timeRange === "month" ? "Last 4 weeks" : "Last 6 months"}</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getTimeSeriesData()} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                  <defs>
                    <linearGradient id="colorDevices" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey={timeRange === "week" ? "day" : "date"} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="devices" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorDevices)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-6">Status Distribution</h2>
            <div className="h-64 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={2}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {viewMode === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics Cards */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-6">Performance Metrics</h2>
            <div className="space-y-4">
              {performanceData.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm text-gray-500">{item.metric}</h3>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                  <div className={`flex items-center text-sm ${item.improving ? 'text-green-600' : 'text-red-600'}`}>
                    {item.improving ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span className="ml-1">{Math.abs(item.change)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Monthly Comparison */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-6">Monthly Comparison</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="manufactured" name="Manufactured" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="delivered" name="Delivered" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {viewMode === "distribution" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Regional Distribution (sample data) */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-700">Device Status by Month</h2>
              <div className="flex items-center">
                <Filter size={16} className="mr-1 text-gray-500" />
                <select className="text-sm border-0 focus:ring-0 text-gray-500 bg-transparent">
                  <option>All Time</option>
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend iconType="circle" />
                  <Line 
                    type="monotone" 
                    dataKey="manufactured" 
                    name="Manufactured" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="shipped" 
                    name="Shipped" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="delivered" 
                    name="Delivered" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    name="Pending" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="bg-white shadow-sm rounded-xl p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-blue-600" size={20} />
          <h2 className="text-lg font-medium text-gray-700">Status Summary</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Efficiency Rate</span>
              <span className="font-medium">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping Success</span>
              <span className="font-medium">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Activation Rate</span>
              <span className="font-medium">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "87%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceAnalytics;