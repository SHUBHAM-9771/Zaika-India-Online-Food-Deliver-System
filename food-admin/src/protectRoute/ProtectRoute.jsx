import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectRoute = () => {
  let location = useLocation();
  let token = localStorage.getItem("AdminToken");

  if (!token) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectRoute;
