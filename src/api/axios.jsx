import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/user/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed, redirect to login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
