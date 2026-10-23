import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://zaika-india-online-food-deliver-system-gfla.onrender.com",
});

axiosInstance.interceptors.request.use((confirm) => {
  let token = localStorage.getItem("AdminToken");

  if (token) {
    confirm.headers.authorization = `Bearer ${token}`;
  }

  return confirm;
});
