import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import Devices from "./Pages/Dashboard/Devices";
import Profile from "./Pages/Dashboard/Profile";
import useAuthStore from "./store/authStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import Settings from "./Pages/Settings";
import HelpCenter from "./Pages/HelpCenter";
import DeviceAnalytics from "./Pages/Dashboard/DeviceAnalytics";

function App() {
  const { isCheckingAuth, fetchCurrentUser, user } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await fetchCurrentUser();
    };
    checkAuth();
  }, [fetchCurrentUser]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        {/* Protected Dashboard Layout */}
        <Route
          path="/dashboard/*"
          element={user ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="devices" element={<Devices />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<DeviceAnalytics/>}/>
          <Route path="helpcenter" element={<HelpCenter/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
