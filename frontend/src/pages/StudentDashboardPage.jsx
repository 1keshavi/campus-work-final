import { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import { fetchApplications } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";
import StatusChart from "../components/StatusChart";

function StudentDashboardPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudentData() {
      try {
        const [jobsData, applicationsData] = await Promise.all([
          fetchJobs(),
          fetchApplications({ userId: user._id }),
        ]);
        setJobs(jobsData);
        setApplications(applicationsData);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load dashboard.");
      }
    }

    loadStudentData();
  }, [user._id]);

  return (
    <section className="page-grid">
      <div className="stats-grid">
        <article className="stat-card">
          <span>Available Jobs</span>
          <strong>{jobs.length}</strong>
        </article>
        <article className="stat-card">
          <span>My Applications</span>
          <strong>{applications.length}</strong>
        </article>
        <article className="stat-card">
          <span>Selected</span>
          <strong>{applications.filter((item) => item.status === "selected").length}</strong>
        </article>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <StatusChart applications={applications} />

      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Suggested Roles</p>
            <h3>Explore current opportunities</h3>
          </div>
        </div>

        <div className="list">
          {jobs.slice(0, 5).map((job) => (
            <article className="list-item" key={job._id}>
              <div>
                <strong>{job.title}</strong>
                <p className="muted">
                  {job.location} · {job.jobType} · {job.salary}
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

export default StudentDashboardPage;
