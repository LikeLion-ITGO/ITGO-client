import axios from "axios";

const axiosAI = axios.create({
  baseURL: import.meta.env.VITE_API_AI_URL,
  withCredentials: false,
  timeout: 120_000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

axiosAI.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosAI;
