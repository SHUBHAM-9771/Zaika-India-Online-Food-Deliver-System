import { axiosInstance } from "../servises/axiousInstance";

export const createStatefoodItem = (foodItems) => {
  return axiosInstance.post("/foodItem", foodItems);
};
