import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.interceptors.request.use((confirm) => {
  let token = localStorage.getItem("UserToken");

  if (token) {
    confirm.headers.Authorization = `Bearer ${token}`;
  }

  return confirm;
});

export default axiosInstance;
