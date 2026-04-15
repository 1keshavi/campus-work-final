import { useEffect, useState } from "react";
import { deleteJob, fetchJobs, updateJob } from "../services/jobService";
import JobForm from "../components/JobForm";

const emptyForm = {
  title: "",
  salary: "",
  location: "",
  category: "",
  jobType: "",
  description: "",
};

function ManageJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadJobs() {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to fetch jobs.");
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((current) => current.filter((job) => job._id !== jobId));
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to delete the job.");
    }
  };

  const startEdit = (job) => {
    setEditingJobId(job._id);
    setEditForm({
      title: job.title,
      salary: job.salary,
      location: job.location,
      category: job.category,
      jobType: job.jobType,
      description: job.description,
    });
  };

  const handleChange = (event) => {
    setEditForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);

    try {
      const updatedJob = await updateJob(editingJobId, editForm);
      setJobs((current) => current.map((job) => (job._id === editingJobId ? updatedJob : job)));
      setEditingJobId(null);
      setEditForm(emptyForm);
      setError("");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to update the job.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-grid">
      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin Controls</p>
            <h3>Manage posted jobs</h3>
          </div>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <div className="list">
          {jobs.map((job) => (
            <article className="list-item wide" key={job._id}>
              <div>
                <strong>{job.title}</strong>
                <p className="muted">
                  {job.location} · {job.jobType} · {job.category}
                </p>
                <p>{job.description}</p>
              </div>
              <div className="action-row">
                <button className="button ghost" onClick={() => startEdit(job)}>
                  Edit
                </button>
                <button className="button danger" onClick={() => handleDelete(job._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {editingJobId ? (
        <div>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Edit Job</p>
              <h3>Update listing details</h3>
            </div>
          </div>
          <JobForm
            formData={editForm}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel="Update Job"
            busy={busy}
          />
        </div>
      ) : null}
    </section>
  );
}

export default ManageJobsPage;
