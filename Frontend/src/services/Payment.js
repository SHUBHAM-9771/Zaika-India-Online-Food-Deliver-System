import axiosInstance from "../services/axiosInstance";

export const procedeorder = (payment) => {
  return axiosInstance.post("/order", payment);
};
