import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { PopupContext } from "../Context/PopupContext/PopoupContext";

const ProtectRoute = () => {
  const { setSignup } = useContext(PopupContext);
  let token = localStorage.getItem("UserToken");

  useEffect(() => {
    if (!token) {
      setSignup(true);
    }
  }, [token, setSignup]);

  return <Outlet />;
};

export default ProtectRoute;
