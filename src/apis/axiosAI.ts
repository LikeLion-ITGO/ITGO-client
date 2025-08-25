import axios from "axios";

// declare module "axios" {
//   export interface InternalAxiosRequestConfig {
//     skipAuth?: boolean;
//   }
// }

const axiosAI = axios.create({
  baseURL: import.meta.env.VITE_API_AI_URL,
  withCredentials: false,
  timeout: 120_000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

export default axiosAI;
