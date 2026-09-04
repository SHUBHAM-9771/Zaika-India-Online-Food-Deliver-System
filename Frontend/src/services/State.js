import axiosInstance from "./axiosInstance";

export const getstate = async (page, limit) => {
  return axiosInstance.get(`/getAllState?page=${page}&limit=${limit}`);
};

export const updatestate = (id) => {
  return axiosInstance.put(`/state-food/${id}`);
};
