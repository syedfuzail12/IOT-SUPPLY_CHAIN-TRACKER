import { NavLink, Link } from "react-router-dom";
import { Home, Cpu, User, BarChart2, Settings, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {logout} = useAuthStore();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };


  const handleLogout = async() =>{
    await logout();
  }

  return (
    <aside className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${collapsed ? "w-20" : "w-64"}`}>
      {/* Header with logo */}
      <div className="relative">
        <Link to="/">
          <div className="p-6 border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              IoT
            </div>
            {!collapsed && (
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                ChainTrack
              </span>
            )}
          </div>
        </Link>
        
        {/* Collapse toggle button */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation section */}
      <div className="flex-grow py-6">
        <div className={`text-xs font-medium text-gray-400 uppercase tracking-wider ${collapsed ? "px-0 text-center" : "px-6"} mb-4`}>
          {!collapsed ? "Main Menu" : "Menu"}
        </div>
        
        <nav className="flex flex-col gap-2 px-3">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Home size={18} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/dashboard/devices"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Cpu size={18} />
            {!collapsed && <span>Devices</span>}
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <BarChart2 size={18} />
            {!collapsed && <span>Analytics</span>}
          </NavLink>

          <div className={`my-4 border-t border-gray-100 ${collapsed ? "mx-2" : "mx-0"}`}></div>

          <div className={`text-xs font-medium text-gray-400 uppercase tracking-wider ${collapsed ? "px-0 text-center" : "px-3"} mb-4`}>
            {!collapsed ? "Account" : "Acc"}
          </div>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <User size={18} />
            {!collapsed && <span>Profile</span>}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Settings size={18} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </nav>
      </div>

      {/* Bottom section with help and logout */}
      <div className="mt-auto border-t border-gray-100">
        <div className="p-4">
          <NavLink to="/dashboard/helpcenter" className={`mb-2 flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-all`}>
            <HelpCircle size={18} />
            {!collapsed && <span>Help Center</span>}
          </NavLink>
          
          <button onClick={handleLogout} className={`flex w-full items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-all`}>
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
        
        {/* Footer */}
        {!collapsed && (
          <footer className="p-4 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} IoT ChainTrack
          </footer>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;