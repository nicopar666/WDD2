import { apiFetch } from "./api";

export async function login(credentials) {
  const data = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
}

export async function register(credentials) {
  const data = await apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
