import "../Style/Navbar.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../public/logo.png";
import { SignUp } from "../Pages/SignUp";
import Registation from "../Pages/Registation";

import { ThemeContext } from "../Context/TheamContext/ThemeContext";
import { PopupContext } from "../Context/PopupContext/PopoupContext";
import { CartContext } from "../Context/CartContext/CartProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const { state } = useContext(CartContext);

  const { Signup, setSignup, showRegister, setShowRegister, user, LogoutUser } =
    useContext(PopupContext);

  // Theme
  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // Login popup
  function handleSignUp() {
    if (user) {
      LogoutUser();
      setSignup(false);
      setShowRegister(false);
      navigate("/");
      return;
    }
    setSignup((prev) => !prev);
  }

  function handleAddtoCart() {
    if (!state || state.length === 0) {
      alert("Your cart is empty");
      return;
    } else {
      navigate("/AddToCart");
    }
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
          <button type="button" className="log" onClick={handleAddtoCart}>
            AddToCart
          </button>

          <button type="button" className="darks" onClick={handleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button type="button" className="log" onClick={handleSignUp}>
            {user || "SignUp"}
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
