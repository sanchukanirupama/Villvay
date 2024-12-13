import axios from "./axios";

export interface AuthResponse {
  status: boolean;
  message: string;
  accessToken: string;
  data: {
    role: "ADMIN" | "USER" | "GUEST";
    email: string;
  };
}

export const signUp = async (email: string, password: string, role: string) => {
  const response = await axios.post("/auth/sign-up", { email, password, role });
  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await axios.post("/auth/sign-in", { email, password });
  return response.data;
};

export const fetchPublicData = async () => {
  const response = await axios.get("/api/public");
  return response.data;
};

export const fetchUserData = async () => {
  const response = await axios.get("/api/user-data");
  return response.data;
};

export const fetchAdminData = async () => {
  const response = await axios.get("/api/admin-data");
  return response.data;
};

export const fetchGuestData = async () => {
  const response = await axios.get("/api/guest-data");
  return response.data;
};

export const updateRole = async (email: string, role: string) => {
  const response = await axios.post("/api/assign-role", { email, role });
  return response.data;
};