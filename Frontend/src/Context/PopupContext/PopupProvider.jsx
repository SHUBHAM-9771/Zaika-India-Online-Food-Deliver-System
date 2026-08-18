import { useState } from "react";
import { PopupContext } from "./PopoupContext";

const PopupProvider = ({ children }) => {
  const [Signup, setSignup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [AddCart, setAddCart] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        Signup,
        setSignup,
        showRegister,
        setShowRegister,
        AddCart,
        setAddCart,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
