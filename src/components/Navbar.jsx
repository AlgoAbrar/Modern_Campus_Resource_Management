import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState("blue");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const switchTheme = (color) => setThemeColor(color);

  return (
    <nav className={`bg-${themeColor}Theme text-black p-4 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">Campus Management System</span>
        </div>
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/room-status">Room Status</a>
          </li>
          <li>
            <a href="/organizer">Organizer</a>
          </li>
          <li>
            <a href="/report-problem">Report Problem</a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <button
            onClick={() => switchTheme("blue")}
            className="w-4 h-4 bg-blueTheme rounded-full"
          ></button>
          <button
            onClick={() => switchTheme("purple")}
            className="w-4 h-4 bg-purpleTheme rounded-full"
          ></button>
          <button className="bg-white text-black px-4 py-1 rounded-md font-semibold">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
