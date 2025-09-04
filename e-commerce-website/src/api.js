import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-2dgi.onrender.com/api", // deployed backend
  withCredentials: true,
});

// ✅ Add interceptor to include JWT token in every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
