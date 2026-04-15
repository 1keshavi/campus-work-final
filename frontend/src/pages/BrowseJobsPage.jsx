import { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import { applyToJob, fetchApplications } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";

function BrowseJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [jobsData, applicationsData] = await Promise.all([
        fetchJobs(),
        fetchApplications({ userId: user._id }),
      ]);
      setJobs(jobsData);
      setAppliedJobIds(applicationsData.map((item) => item.jobId?._id));
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to load jobs.");
    }
  }

  useEffect(() => {
    loadData();
  }, [user._id]);

  const handleApply = async (jobId) => {
    try {
      await applyToJob({ userId: user._id, jobId });
      setAppliedJobIds((current) => [...current, jobId]);
      setError("");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to submit application.");
    }
  };

  return (
    <section className="page-grid">
      {error ? <p className="error-text">{error}</p> : null}

      <div className="job-grid">
        {jobs.map((job) => {
          const hasApplied = appliedJobIds.includes(job._id);

          return (
            <article className="card job-card" key={job._id}>
              <div className="job-meta">
                <span className="badge">{job.category}</span>
                <span className="badge outline">{job.jobType}</span>
              </div>
              <h3>{job.title}</h3>
              <p className="muted">
                {job.location} · {job.salary}
              </p>
              <p>{job.description}</p>
              <button
                className="button primary"
                disabled={hasApplied}
                onClick={() => handleApply(job._id)}
              >
                {hasApplied ? "Applied" : "Apply Now"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default BrowseJobsPage;
