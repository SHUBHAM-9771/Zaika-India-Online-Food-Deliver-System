import { useContext, useState } from "react";
import axios from "axios";
import "../Style/SignUp.css";

import Instagram from "../../public/instagram.png";
import Facebook from "../../public/facebook.png";
import Twitter from "../../public/twitter.png";

import { PopupContext } from "../Context/PopupContext/PopoupContext";

export const SignUp = () => {
  const { setSignup, setShowRegister, LoginUser } = useContext(PopupContext);

  const [login, setLoging] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setLoging({
      ...login,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:9000/userlogin", login);

      let email = response?.data?.user?.email;
      let user = response?.data?.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (email) {
        let firstname = email.slice(0, 1);
        LoginUser(firstname.toUpperCase());
      }

      let token = response?.data?.token;
      if (token) {
        localStorage.setItem("UserToken", token);
      }
      setLoging({
        email: "",
        password: "",
      });
      setSignup(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup-content">
          {/* Close Button */}
          <span className="close-btn1" onClick={() => setSignup(false)}>
            &times;
          </span>

          <h1>Login</h1>

          <p className="t3">Get access to more learning features</p>

          <p className="t2">
            Don't have an account?
            <button
              type="button"
              className="text-btn"
              onClick={() => {
                setSignup(false);
                setShowRegister(true);
              }}
            >
              Register
            </button>
          </p>
        </div>

        {/* Social Links */}
        <div className="link">
          <img src={Facebook} alt="Facebook" />
          <img src={Instagram} alt="Instagram" />
          <img src={Twitter} alt="Twitter" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="Input">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={login.email}
              onChange={handleInput}
            />
          </div>

          <div className="Input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={handleInput}
            />
          </div>

          <p className="forget">Forgot your password?</p>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
