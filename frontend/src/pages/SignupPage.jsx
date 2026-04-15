import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await signup(formData);
      setUser(response.user);
      navigate(response.user.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to create account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-frame">
        <div className="auth-header">
          <div className="auth-logo">[]</div>
          <h1>Campus Work</h1>
          <p className="muted">Register and start exploring campus jobs</p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label>
            <span className="auth-label">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@college.ac.in"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            <span className="auth-label">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label>
            <span className="auth-label">Role</span>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button className="button primary auth-button" type="submit" disabled={busy}>
            {busy ? "Creating Account..." : "Register"}
          </button>

          <p className="muted auth-footnote">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
