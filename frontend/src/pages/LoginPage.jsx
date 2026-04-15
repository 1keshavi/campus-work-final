import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const response = await login(formData);
      setUser(response.user);
      navigate(response.user.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to login right now.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-frame">
        <div className="auth-header">
          <div className="auth-logo">[]</div>
          <h1>Jobs Near Your Campus</h1>
          <p className="muted">Sign in to find part-time opportunities</p>
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
              placeholder="........"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button className="button primary auth-button" type="submit" disabled={busy}>
            {busy ? "Signing In..." : "Sign In"}
          </button>

          <p className="muted auth-footnote">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
