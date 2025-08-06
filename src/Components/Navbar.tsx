import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="text-xl font-bold text-blue-600 dark:text-white flex items-center gap-2">
        📋 Task Master
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          ➕ Add Task
        </button>
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-white text-xl"
        >
          🌙
        </button>
        <button
          onClick={() => navigate("/progress")}
          className="text-gray-600 dark:text-white text-xl"
        >
          📈
        </button>
      </div>
    </nav>
  );
};
