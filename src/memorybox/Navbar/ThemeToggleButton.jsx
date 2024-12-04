const ThemeToggleButton = ({ isDarkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
  >
    {isDarkMode ? "🌙 Dark" : "☀️ Light"}
  </button>
);
export default ThemeToggleButton;
