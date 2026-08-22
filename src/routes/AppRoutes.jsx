import { Routes, Route } from "react-router-dom";
import Courses from "../pages/Courses";
import Students from "../pages/Students";
import Dashboard from "../pages/Dashboard";
import Enrollment from "../pages/Enrollment";
import Nav from "../components/Nav";
import MainLayout from "../Layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/Enrollment" element={<Enrollment />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/MainLayout" element={<MainLayout /> } />
    </Routes>
  );
}

export default AppRoutes;