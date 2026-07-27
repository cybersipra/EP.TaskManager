import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:44363/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;