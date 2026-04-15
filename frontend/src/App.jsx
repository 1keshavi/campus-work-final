import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageJobsPage from "./pages/ManageJobsPage";
import AddJobPage from "./pages/AddJobPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import BrowseJobsPage from "./pages/BrowseJobsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="jobs" element={<ManageJobsPage />} />
        <Route path="jobs/new" element={<AddJobPage />} />
        <Route path="applicants" element={<ApplicantsPage />} />
      </Route>
      <Route
        path="/student"
        element={
          <ProtectedRoute role="user">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="jobs" element={<BrowseJobsPage />} />
        <Route path="applications" element={<MyApplicationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
