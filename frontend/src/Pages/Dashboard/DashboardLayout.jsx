import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";
import Sidebar from "../../components/Layouts/Sidebar";
import useAuthStore from "../../store/authStore";
import { LogOut, Menu, Bell, Search, User, Settings, ChevronDown } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Set page title based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/dashboard/devices")) {
      setPageTitle("Devices");
    } else if (path.includes("/dashboard/profile")) {
      setPageTitle("Profile");
    } else if (path.includes("/dashboard/analytics")) {
      setPageTitle("Analytics");
    } else if (path.includes("/dashboard/settings")) {
      setPageTitle("Settings");
    } else {
      setPageTitle("Dashboard");
    }
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Sidebar for mobile with overlay */}
      <div
        className={`fixed inset-0 z-50 flex md:hidden transition-all duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-64 h-full transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
        <div
          className="flex-1 bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Hamburger menu for mobile */}
              <button
                className="md:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              
              {/* Page title */}
              <div>
                <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  {new Date().toLocaleDateString("en-US", { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Search bar and actions */}
            <div className="flex items-center gap-3">
              {/* Search bar - hidden on smaller screens */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>

              {/* Notification button */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings button */}
              <NavLink to="/dashboard/settings" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <Settings size={20} />
              </NavLink>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                  </div>
                  <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
                </button>

                {/* Dropdown menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                    <button
                      onClick={() => {
                        navigate("/dashboard/profile");
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <User size={16} />
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/settings");
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Breadcrumb navigation - optional */}
          <div className="px-6 py-2 text-sm text-gray-500 hidden md:block">
            <NavLink to="/dashboard"><span className="font-medium text-blue-600">Dashboard</span></NavLink>
            {pageTitle !== "Dashboard" && (
              <>
                <span className="mx-2">/</span>
                <span>{pageTitle}</span>
              </>
            )}
          </div>
        </header>

        {/* Quick search for mobile */}
        <div className="px-4 pt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Main content with scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>

        {/* Footer - optional */}
        <footer className="bg-white p-4 text-center text-xs text-gray-500 border-t border-gray-100 hidden md:block">
          &copy; {new Date().getFullYear()} IoT ChainTrack. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;