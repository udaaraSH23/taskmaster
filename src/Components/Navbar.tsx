import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

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
        <ThemeToggle />
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
