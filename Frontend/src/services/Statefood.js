import axiosInstance from "./axiosInstance";

export const getStatefood = () => {
  return axiosInstance.get("/getStatefoods");
};

export const UpdateStatefood = (state) => {
  return axiosInstance.put(`/state-foods/${state}`);
};
