import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Authcontext";
import { axiosInstance } from "../servises/axiousInstance";

const AuthContectPRovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminName, setAdminName] = useState("");

  const LoginUser = (admin) => {
    setUser(admin);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("AdminToken");
  };

  useEffect(() => {
    async function getAdmin() {
      try {
        const AdminToken = localStorage.getItem("AdminToken");
        if (AdminToken) {
          let response = await axiosInstance.get("/getlogin");
          let admin = response?.data?.admin?.name;
          let firstname = admin.charAt(0);
          setUser(firstname);
          setAdminName(admin);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("AdminToken");
        setUser(null);
      }
    }
    getAdmin();
  }, []);
  return (
    <AuthContext.Provider
      value={{ LoginUser, logoutUser, user, setAdminName, adminName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContectPRovider;
