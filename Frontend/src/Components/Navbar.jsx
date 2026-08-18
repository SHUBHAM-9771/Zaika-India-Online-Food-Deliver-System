import "../Style/Navbar.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/Images/logo.png";
import { SignUp } from "../Pages/SignUp";
import Registation from "../Pages/Registation";

import { ThemeContext } from "../Context/TheamContext/ThemeContext";
import { PopupContext } from "../Context/PopupContext/PopoupContext";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const { Signup, setSignup, showRegister, setShowRegister } =
    useContext(PopupContext);

  const navigation = useNavigate();

  // Theme
  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // Login popup
  function handleSignUp() {
    setSignup((prev) => !prev);
  }

  //AddToCart popup
  function handleAddToCart() {
    setAddCart((prev) => !prev);
  }

  return (
    <div>
      <nav className="cointaine">
        {/* Logo */}
        <div className="logo">
          <img src={logo} loading="lazy" alt="Zaika India" />
        </div>

        {/* Navigation */}
        <ul className="nav-link">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/menu">Search</NavLink>

          <NavLink to="/offers">Offers</NavLink>

          <NavLink to="/footer">Footer</NavLink>
        </ul>

        {/* Buttons */}
        <div className="nav-button">
          <NavLink
            to="/AddToCart"
            type="button"
            className="log"
            onClick={() => navigation("/AddToCart")}
          >
            AddToCart
          </NavLink>

          <button type="button" className="darks" onClick={handleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button type="button" className="log" onClick={handleSignUp}>
            SignUp
          </button>
        </div>
      </nav>

      {/* Login Popup */}
      {Signup && <SignUp />}

      {/* Registration Popup */}
      {showRegister && <Registation />}
    </div>
  );
};

export default Navbar;
