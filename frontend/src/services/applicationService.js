import api from "./api";

export async function applyToJob(payload) {
  const { data } = await api.post("/applications/apply", payload);
  return data;
}

export async function fetchApplications(params = {}) {
  const { data } = await api.get("/applications", { params });
  return data;
}

export async function updateApplicationStatus(applicationId, payload) {
  const { data } = await api.put(`/applications/${applicationId}`, payload);
  return data;
}
