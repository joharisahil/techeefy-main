// BaseLayout.jsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LIGHT_THEME } from "../constants/themeConstants";
import MoonIcon from "../assets/icons/moon.svg";
import SunIcon from "../assets/icons/sun.svg";
import "./BaseLayout.scss";

const BaseLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            alt="Toggle Theme"
          />
        </button>
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
