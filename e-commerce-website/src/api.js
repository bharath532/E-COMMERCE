import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-2dgi.onrender.com",
  withCredentials: true, // only if your backend uses cookies/auth
});

export default API;
