// src/components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const SunIcon = () => <span role="img" aria-label="sun">🌞</span>;
const MoonIcon = () => <span role="img" aria-label="moon">🌙</span>;

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white transition-colors duration-200"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
