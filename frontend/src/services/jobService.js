import api from "./api";

export async function fetchJobs() {
  const { data } = await api.get("/jobs");
  return data;
}

export async function createJob(payload) {
  const { data } = await api.post("/jobs", payload);
  return data;
}

export async function updateJob(jobId, payload) {
  const { data } = await api.put(`/jobs/${jobId}`, payload);
  return data;
}

export async function deleteJob(jobId) {
  const { data } = await api.delete(`/jobs/${jobId}`);
  return data;
}
