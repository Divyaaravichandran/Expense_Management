import api from "../api/axios";

// Returns JWT + user profile from the backend.
export const signup = async (name: string, email: string, password: string) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data as { token: string; user: { id: string; name: string; email: string } };
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data as { token: string; user: { id: string; name: string; email: string } };
};
