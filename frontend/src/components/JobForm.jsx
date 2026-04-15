const defaultState = {
  title: "",
  salary: "",
  location: "",
  category: "",
  jobType: "",
  description: "",
};

function JobForm({ formData, onChange, onSubmit, submitLabel, busy }) {
  const data = formData || defaultState;

  return (
    <form className="form card" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          <span>Job Title</span>
          <input name="title" value={data.title} onChange={onChange} placeholder="Frontend Intern" />
        </label>
        <label>
          <span>Salary</span>
          <input name="salary" value={data.salary} onChange={onChange} placeholder="₹15,000 / month" />
        </label>
        <label>
          <span>Location</span>
          <input name="location" value={data.location} onChange={onChange} placeholder="Jaipur" />
        </label>
        <label>
          <span>Category</span>
          <input name="category" value={data.category} onChange={onChange} placeholder="Engineering" />
        </label>
        <label>
          <span>Job Type</span>
          <input name="jobType" value={data.jobType} onChange={onChange} placeholder="Part-Time" />
        </label>
      </div>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          value={data.description}
          onChange={onChange}
          rows="5"
          placeholder="Describe the role, responsibilities, and expected skills."
        />
      </label>
      <button className="button primary" type="submit" disabled={busy}>
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default JobForm;
