const API_BASE = import.meta.env.VITE_API_URL || "https://resumate-0yaz.onrender.com";

export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}
