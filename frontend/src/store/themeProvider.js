// src/utils/theme.js

// Function to set the theme
export const setTheme = (theme) => {
    // Add or remove the 'dark' class on the document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store the theme preference
    localStorage.setItem('theme', theme);
    
    // Optional: Dispatch a custom event to notify other parts of the application
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  };
  
  // Function to get the current theme
  export const getTheme = () => {
    // Check if there's a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check for system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };
  
  // Initialize the theme on page load
  export const initTheme = () => {
    const theme = getTheme();
    setTheme(theme);
    return theme;
  };
  
  // Toggle the current theme
  export const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    return newTheme;
  };