import axiosInstance from "../services/axiosInstance";

export const createRegistration = (formData) => {
  return axiosInstance.post("/registration", formData);
};

export const createLogin = (formsData) => {
  console.log("3. SERVICE DATA:", formsData);

  return axiosInstance.post("/login", formsData);
};
