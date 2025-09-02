import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-2dgi.onrender.com/api", // deployed backend
  withCredentials: true,
});

export default API;
