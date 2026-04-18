import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcome-shell">
      <div className="welcome-backdrop" />

      <header className="landing-nav glass-panel">
        <div className="landing-logo-wrap">
          <div className="landing-logo-mark">CW</div>
          <span className="landing-logo-text">Campus Work</span>
        </div>

        <div className="landing-nav-actions">
          <Link className="landing-nav-link" to="/login">
            Sign In
          </Link>
          <Link className="button primary" to="/signup">
            Register
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-copy">
            <p className="landing-kicker">Student-first job portal</p>
            <h1>
              Campus jobs with a
              <span> premium workflow</span>
            </h1>
            <p className="landing-subtext">
              Find nearby part-time work, apply fast, and track every step in one place.
            </p>

            <div className="landing-cta-row">
              <Link className="button primary landing-cta" to="/signup">
                Get Started
              </Link>
              <Link className="button ghost landing-cta" to="/login">
                Live Login
              </Link>
            </div>
          </div>

          <div className="landing-login glass-panel">
            <div className="landing-login-head">
              <span className="landing-pill">Live Access</span>
              <h2>Jobs Near Your Campus</h2>
              <p>Sign in to continue</p>
            </div>

            <div className="landing-form-preview">
              <label>
                <span>Email</span>
                <input type="text" placeholder="you@college.ac.in" readOnly />
              </label>
              <label>
                <span>Password</span>
                <input type="password" placeholder="........" readOnly />
              </label>
              <button className="button primary landing-login-button" type="button">
                Sign In
              </button>
            </div>
          </div>
        </section>

        <section className="landing-features">
          <article className="glass-panel feature-card">
            <div className="feature-icon feature-purple">01</div>
            <h3>Local Openings</h3>
            <p>Discover student-friendly jobs around your campus radius.</p>
          </article>

          <article className="glass-panel feature-card">
            <div className="feature-icon feature-blue">02</div>
            <h3>Quick Apply</h3>
            <p>Apply with a clean flow designed for speed and clarity.</p>
          </article>

          <article className="glass-panel feature-card">
            <div className="feature-icon feature-cyan">03</div>
            <h3>Status Tracking</h3>
            <p>Track progress from applied to selected without clutter.</p>
          </article>
        </section>

        <section className="landing-stats glass-panel">
          <div>
            <strong>120+</strong>
            <span>Open roles</span>
          </div>
          <div>
            <strong>40+</strong>
            <span>Campus partners</span>
          </div>
          <div>
            <strong>1 min</strong>
            <span>Quick apply flow</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Status visibility</span>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>Campus Work</span>
        <span>Jobs Near Your Campus</span>
      </footer>
    </div>
  );
}

export default WelcomePage;
