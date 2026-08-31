import { useContext, useState } from "react";

import "../Style/SignUp.css";

import instagram from "../assets/Images/instagram.png";
import facebook from "../assets/Images/facebook.png";
import twitter from "../assets/Images/twitter.png";

import { PopupContext } from "../Context/PopupContext/PopoupContext";

export const SignUp = () => {
  const { Signup, setSignup, showRegister, setShowRegister } =
    useContext(PopupContext);

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

  function handleSubmit(e) {
    e.preventDefault();

    console.log(login);

    setLoging({
      email: "",
      password: "",
    });
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
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={twitter} alt="Twitter" />
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
