import axios from "axios";

const axiosAI = axios.create({
  baseURL: import.meta.env.VITE_API_AI_URL,
  withCredentials: false,
  timeout: 120_000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});


export default axiosAI;
