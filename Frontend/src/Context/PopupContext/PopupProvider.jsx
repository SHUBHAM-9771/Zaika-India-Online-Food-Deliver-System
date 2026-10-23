import { useEffect, useState } from "react";
import axios from "axios";

import { PopupContext } from "./PopoupContext";
import { useNavigate } from "react-router-dom";

const PopupProvider = ({ children }) => {
  const [Signup, setSignup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [AddCart, setAddCart] = useState(false);

  const [user, setUser] = useState("");

  const LoginUser = (user) => {
    setUser(user);
  };

  const LogoutUser = () => {
    setUser(null);
    localStorage.removeItem("UserToken");
  };

  async function getlogin() {
    try {
      let token = localStorage.getItem("UserToken");

      if (token) {
        let response = await axios.get("http://localhost:9000/getUser");
        console.log(response);
        let users = response?.data?.user?.[0]?.email;
        console.log(users);

        if (users) {
          let firstword = users.slice(0, 1);
          console.log(firstword);
          setUser(firstword.toUpperCase());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getlogin();
  }, []);
  return (
    <PopupContext.Provider
      value={{
        user,
        setUser,
        LoginUser,
        LogoutUser,
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
