import axiosInstance from "./axiosInstance";

export const createAddress = async (createaddress) => {
  return axiosInstance.post("/address", createaddress);
};

export const getAddresses = () => {
  return axiosInstance.get("/getAddress");
};
