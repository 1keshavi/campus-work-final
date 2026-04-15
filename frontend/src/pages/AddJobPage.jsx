import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { createJob } from "../services/jobService";

const initialState = {
  title: "",
  salary: "",
  location: "",
  category: "",
  jobType: "",
  description: "",
};

function AddJobPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);

    try {
      await createJob(formData);
      navigate("/admin/jobs");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to create the job.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-grid">
      <div className="section-heading">
        <div>
          <p className="eyebrow">New Opening</p>
          <h3>Create a job listing</h3>
        </div>
      </div>
      {error ? <p className="error-text">{error}</p> : null}
      <JobForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Job"
        busy={busy}
      />
    </section>
  );
}

export default AddJobPage;
