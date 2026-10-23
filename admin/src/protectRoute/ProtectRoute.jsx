import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  //   const navigation = useNavigate();
  let token = localStorage.getItem("AdminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
    // return navigation("/login");
  }
  return <Outlet></Outlet>;
};

export default ProtectRoute;
