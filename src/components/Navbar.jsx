import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { BotIcon, MoonIcon, SunIcon } from "./Icons";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md sticky top-0 z-50 px-6 sm:px-12 flex items-center justify-between transition-colors duration-300">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          DocuBrain
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <a
          href="/#features"
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium hidden sm:block"
        >
          Features
        </a>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        <Link to="/app">
          <button className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Launch App
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
