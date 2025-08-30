import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RoomStatus from "../pages/RoomStatus";
import Organizer from "../pages/Organizer";
import ReportProblem from "../pages/ReportProblem";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room-status" element={<RoomStatus />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/report-problem" element={<ReportProblem />} />
      </Routes>
    </MainLayout>
  </Router>
);

export default AppRoutes;
