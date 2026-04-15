import { useEffect, useState } from "react";
import { fetchApplications, updateApplicationStatus } from "../services/applicationService";

function ApplicantsPage() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  async function loadApplications() {
    try {
      const data = await fetchApplications();
      setApplications(data);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to load applicants.");
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const updatedApplication = await updateApplicationStatus(applicationId, { status });
      setApplications((current) =>
        current.map((item) => (item._id === applicationId ? updatedApplication : item))
      );
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to update the status.");
    }
  };

  return (
    <section className="page-grid">
      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Applicants</p>
            <h3>Review and update candidate status</h3>
          </div>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{application.userId?.email}</td>
                  <td>{application.jobId?.title}</td>
                  <td>
                    <span className="badge">{application.status}</span>
                  </td>
                  <td>
                    <select
                      value={application.status}
                      onChange={(event) =>
                        handleStatusChange(application._id, event.target.value)
                      }
                    >
                      <option value="applied">Applied</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ApplicantsPage;
