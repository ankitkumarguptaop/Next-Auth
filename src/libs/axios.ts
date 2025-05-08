import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
  withCredentials: true,
  }, 
  validateStatus: () => true
});

export default axiosInstance;