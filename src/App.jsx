// App.jsx
import React, { useContext, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Section from "./screens/academics/SectionScreen";
import Stream from "./screens/academics/StreamScreen";
import Subject from "./screens/academics/SubjectScreen";
import Class from "./screens/academics/ClassScreen";
import AssignClassSubject from "./screens/academics/AssignClassSubjectScreen";
import AssignClassTeacher from "./screens/academics/AssignClassTeacherScreen";
import AssignTeacherSubject from "./screens/academics/AssignSubjectTeacherScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sections" element={<Section />} />
      <Route path="/streams" element={<Stream />} />
      <Route path="/subjects" element={<Subject />} />
      <Route path="/class" element={<Class />} />
      <Route path="/assignclasssubjects" element={<AssignClassSubject />} />
      <Route path="/assignclassteacher" element={<AssignClassTeacher />} />
      <Route path="/assignsubjectteacher" element={<AssignTeacherSubject />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
