import { axiosInstance } from "../servises/axiousInstance";

export const getorder = () => {
  return axiosInstance.get("/getorder");
};

export const updateSingleId = (id, status) => {
  console.log("Order ID:", id);
  console.log("New status:", status);

  return axiosInstance.patch(`/orders/${id}/status`, {
    orderStatus: status,
  });
};
