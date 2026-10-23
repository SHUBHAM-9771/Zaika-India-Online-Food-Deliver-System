import { axiosInstance } from "./axiousInstance";
export const createRegistation = async (formdata) => {
  return axiosInstance.post("/registration", formdata);
};

export const adminlogin = (adminData) => {
  return axiosInstance.post("/login", adminData);
};
