import { Routes, Route } from "react-router-dom";
import Courses from "../pages/Courses";
import Students from "../pages/Students";
import Dashboard from "../pages/Dashboard";
import Enrollment from "../pages/Enrollment";

import MainLayout from "../Layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/MainLayout" element={<MainLayout /> } />
    </Routes>
  );
}

export default AppRoutes;