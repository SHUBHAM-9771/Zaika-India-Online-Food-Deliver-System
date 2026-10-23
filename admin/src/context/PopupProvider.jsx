import React, { useState } from "react";
import { PopupContext } from "./PopupContext";

const PopupProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("");

  return (
    <div>
      <PopupContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          adminName,
          setAdminName,
        }}
      >
        {children}
      </PopupContext.Provider>
    </div>
  );
};

export default PopupProvider;
