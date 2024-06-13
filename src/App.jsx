import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Section from "./screens/academics/SectionScreen";
import Stream from "./screens/academics/StreamScreen";
import Subject from "./screens/academics/SubjectScreen";
import Class from "./screens/academics/ClassScreen";
import AssignClassSubject from "./screens/academics/AssignClassSubjectScreen";
import AssignClassTeacher from "./screens/academics/AssignClassTeacherScreen";
import AssignTeacherSubject from "./screens/academics/AssignSubjectTeacherScreen";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sections" element={<Section />} />
            <Route path="/streams" element={<Stream />} />
            <Route path="/subjects" element={<Subject />} />
            <Route path="/class" element={<Class />} />
            <Route
              path="/assignclasssubjects"
              element={<AssignClassSubject />}
            />
            <Route
              path="/assignclassteacher"
              element={<AssignClassTeacher />}
            />
            <Route
              path="/assignsubjectteacher"
              element={<AssignTeacherSubject />}
            />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
