import { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import { fetchApplications } from "../services/applicationService";
import StatusChart from "../components/StatusChart";

function AdminDashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [jobsData, applicationsData] = await Promise.all([fetchJobs(), fetchApplications()]);
        setJobs(jobsData);
        setApplications(applicationsData);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load dashboard.");
      }
    }

    loadDashboard();
  }, []);

  const selectedCount = applications.filter((item) => item.status === "selected").length;
  const uniqueApplicants = new Set(applications.map((item) => item.userId?._id)).size;
  const selectionRate = applications.length
    ? Math.round((selectedCount / applications.length) * 100)
    : 0;
  const categoryCounts = jobs.reduce((acc, job) => {
    const category = job.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const maxCategoryCount = Math.max(1, ...Object.values(categoryCounts));

  return (
    <section className="page-grid">
      <h1 className="page-title">Analytics Dashboard</h1>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total Jobs</span>
          <strong>{jobs.length}</strong>
        </article>
        <article className="stat-card">
          <span>Total Applications</span>
          <strong>{applications.length}</strong>
        </article>
        <article className="stat-card">
          <span>Unique Applicants</span>
          <strong>{uniqueApplicants}</strong>
        </article>
        <article className="stat-card">
          <span>Selection Rate</span>
          <strong>{selectionRate}%</strong>
        </article>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="dashboard-panels">
        <div className="card">
          <div className="section-heading">
            <div>
              <h3>Applications by Category</h3>
            </div>
          </div>

          <div className="category-chart">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div className="category-row" key={category}>
                <div className="chart-labels">
                  <span>{category}</span>
                  <strong>{count}</strong>
                </div>
                <div className="chart-track">
                  <div
                    className="chart-fill purple-fill"
                    style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <StatusChart applications={applications} />
      </div>

      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recent Openings</p>
            <h3>Latest jobs posted</h3>
          </div>
        </div>

        <div className="list">
          {jobs.slice(0, 5).map((job) => (
            <article className="list-item" key={job._id}>
              <div>
                <strong>{job.title}</strong>
                <p className="muted">
                  {job.location} / {job.jobType} / {job.salary}
                </p>
              </div>
              <span className="badge">{job.category}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
