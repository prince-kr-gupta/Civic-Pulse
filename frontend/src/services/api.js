const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("civic-token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export const api = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    }),
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  uploadEvidence: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("civic-token");

    const response = await fetch(`${API_BASE_URL}/uploads`, {
      method: "POST",
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Image upload failed.");
    }

    return data;
  },
  getIssues: () => request("/issues"),
  getIssue: (id) => request(`/issues/${encodeURIComponent(id)}`),
  createIssue: (issue) =>
    request("/issues", {
      method: "POST",
      body: JSON.stringify(issue)
    }),
  updateIssue: (id, payload) =>
    request(`/issues/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload)
    }),
  deleteIssue: (id) =>
    request(`/issues/${encodeURIComponent(id)}`, {
      method: "DELETE"
    })
};
