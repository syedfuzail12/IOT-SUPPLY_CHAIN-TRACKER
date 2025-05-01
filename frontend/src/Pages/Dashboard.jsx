// src/Pages/Dashboard.jsx
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./Dashboard/DashboardLayout";
import DashboardHome from "./Dashboard/DashboardHome";
import Devices from "./Dashboard/Devices";
import Profile from "./Dashboard/Profile";

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="devices" element={<Devices />} />
        <Route path="profile" element={<Profile />} />
        {/* Add more like settings etc. */}
      </Route>
    </Routes>
  );
};

export default Dashboard;
