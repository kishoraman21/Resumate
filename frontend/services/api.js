const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}
