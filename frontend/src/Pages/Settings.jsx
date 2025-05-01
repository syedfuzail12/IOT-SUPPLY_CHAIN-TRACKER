import React, { useState, useEffect } from 'react';
import { Sun, Moon, Settings as SettingsIcon } from 'lucide-react';
import { getTheme, toggleTheme } from '../store/themeProvider'; // Import theme utilities

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
  
  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail === 'dark');
    };
    
    window.addEventListener('themechange', handleThemeChange);
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);
  
  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setIsDarkMode(newTheme === 'dark');
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <SettingsIcon className="mr-2" size={24} />
          Settings
        </h1>
      </div>
      
      <div className="space-y-6">
        {/* Theme Setting */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {isDarkMode ? 
                <Moon className="text-blue-500" size={20} /> : 
                <Sun className="text-yellow-500" size={20} />
              }
              <span className="font-medium text-gray-700 dark:text-gray-300">Theme</span>
            </div>
            
            <button 
              onClick={handleToggleTheme}
              className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
              />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {isDarkMode ? 'Dark mode is currently active' : 'Light mode is currently active'}
          </p>
        </div>
        
        {/* Additional settings sections */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Notification Preferences</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage how you receive notifications
          </p>
        </div>
        
        <div className="pb-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Privacy Settings</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Control your privacy options
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;