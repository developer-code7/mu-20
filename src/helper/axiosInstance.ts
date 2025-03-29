import axios from "axios";
const axiosInstance = axios.create();

const BASE_URL = import.meta.env.VITE_RENDER_URL || import.meta.env.VITE_LOCAL_BASE_URL;
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
