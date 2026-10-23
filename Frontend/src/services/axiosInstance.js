import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zaika-india-online-food-deliver-system-gfla.onrender.com",
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
