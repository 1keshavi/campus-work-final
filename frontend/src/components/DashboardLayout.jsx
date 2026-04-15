import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navConfig = {
  admin: [
    { to: "/admin/dashboard", label: "Analytics" },
    { to: "/admin/jobs", label: "Manage Jobs" },
    { to: "/admin/jobs/new", label: "Add Job" },
    { to: "/admin/applicants", label: "Applicants" },
  ],
  user: [
    { to: "/student/dashboard", label: "Dashboard" },
    { to: "/student/jobs", label: "Browse Jobs" },
    { to: "/student/applications", label: "My Applications" },
  ],
};

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = navConfig[user?.role] || [];
  const firstLetter = user?.email?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-main">
          <div className="brand-lockup">
            <div className="brand-mark">[]</div>
            <div>
              <p className="brand-title">Campus Work</p>
              <p className="brand-subtitle">JOBS NEAR YOUR CAMPUS</p>
            </div>
          </div>

          <nav className="nav">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <p className="muted sidebar-email">{user?.email}</p>
          <button className="button ghost sidebar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="topbar-title">
            <span className="topbar-icon">{user?.role === "admin" ? "[]" : "@@"}</span>
            <div>
              <p className="topbar-label">
                {user?.role === "admin" ? "Admin Panel" : "Student Panel"}
              </p>
              <h2>
                {user?.role === "admin"
                  ? "Analytics Dashboard"
                  : "Jobs Near Your Campus"}
              </h2>
            </div>
          </div>

          <div className="avatar-chip">{firstLetter}</div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
