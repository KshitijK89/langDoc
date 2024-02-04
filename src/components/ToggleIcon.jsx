import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ToggleIcon.css";

const ToggleIcon = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode(!isDarkMode);
    document.documentElement.style.backgroundColor = isDarkMode ? "#fff" : "#000";
  };

  return (
    <div
      className={`toggle-icon ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleMode}
    >
      {isDarkMode ? <FaMoon /> : <FaSun />}
    </div>
  );
};

export default ToggleIcon;
