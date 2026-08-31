import axiosInstance from "../services/axiosInstance";

// getstate
export const getstate = () => {
  return axiosInstance.get("/getAllState");
};

// create state
export const createstate = (statefood) => {
  return axiosInstance.post("/state", statefood);
};

// update state
export const updatestate = (id, statefood) => {
  return axiosInstance.put(`/state-food/${id}`, statefood);
};

// deletefood
export const deletefood = (id) => {
  return axiosInstance.delete(`/state-foods/${id}`);
};
