import { useEffect, useState } from "react";
import { fetchApplications } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";

function MyApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await fetchApplications({ userId: user._id });
        setApplications(data);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to fetch applications.");
      }
    }

    loadApplications();
  }, [user._id]);

  return (
    <section className="page-grid">
      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">My Progress</p>
            <h3>Track every application</h3>
          </div>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{application.jobId?.title}</td>
                  <td>{application.jobId?.location}</td>
                  <td>{application.jobId?.jobType}</td>
                  <td>
                    <span className="badge">{application.status}</span>
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

export default MyApplicationsPage;
