import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-3 rounded-full transition-all duration-300 ${
        darkMode 
          ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700' 
          : 'bg-white text-neutral-600 hover:bg-neutral-100'
      } shadow-lg border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
    </button>
  );
};

export default ThemeToggle;
