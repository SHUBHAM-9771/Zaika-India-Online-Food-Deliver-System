import axiosInstance from "../services/axiosInstance";

// get state food items
export const getstatefood = () => {
  return axiosInstance.get("/getfoodItem");
};

// create state food items
export const createfoodItem = (fooditem) => {
  return axiosInstance.post(`/foodItem`, fooditem);
};

// update state food Items
export const updatefooditem = (id, fooditem) => {
  return axiosInstance.put(`/food-items/${id}`, fooditem);
};

// delete state food Items
export const deletefoodItems = (id) => {
  return axiosInstance.delete(`/food-item/${id}`);
};
