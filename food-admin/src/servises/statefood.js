import { axiosInstance } from "../servises/axiousInstance";

export const createstatefood = (statefood) => {
  console.log(statefood);
  return axiosInstance.post("/statefoods", statefood);
};
