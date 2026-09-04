import axiosInstance from "./axiosInstance";

export const getStatefoodItem = () => {
  return axiosInstance.get("/getfoodItem");
};

export const UpdateStatefoodItem = (id) => {
  return axiosInstance.put(`/food-items/${id}`);
};
