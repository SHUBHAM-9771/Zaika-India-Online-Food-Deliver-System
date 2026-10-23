import { axiosInstance } from "../servises/axiousInstance";

export const createstate = (statefood) => {
  console.log(statefood);
  return axiosInstance.post("/state", statefood);
};
