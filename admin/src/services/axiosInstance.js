import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});

axiosInstance.interceptors.request.use((confirm) => {
  const token = localStorage.getItem("AdminToken");

  if (token) {
    confirm.headers.Authorization = `Bearer ${token}`;
  }
  return confirm;
});

export default axiosInstance;
