import axiosInstance from "../services/axiosInstance";

// getstate food  /foods
export const getstatefood = () => {
  return axiosInstance.get("/getStatefoods");
};

// create state food
export const createstatefood = (statefood) => {
  console.log("Sending statefood:", statefood);

  return axiosInstance.post("/statefoods", statefood);
};

// update state food
export const updatestatefood = (id, statefood) => {
  return axiosInstance.put(`/state-foods/${id}`, statefood);
};
// delete state food
export const deletestatefood = (id) => {
  return axiosInstance.delete(`/state-food/${id}`);
};
