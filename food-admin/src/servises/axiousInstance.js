import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});

axiosInstance.interceptors.request.use((confirm) => {
  let token = localStorage.getItem("AdminToken");

  if (token) {
    confirm.headers.authorization = `Bearer ${token}`;
  }

  return confirm;
});
