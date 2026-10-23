import { useLocation, useNavigate } from "react-router-dom";
import "../Style/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { themeContext } from "../context/TheamProvider";
import logo from "../../public/logo.png";
const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useContext(themeContext);

  const getPageName = () => {
    switch (location.pathname) {
      case "/state":
        return "State";

      case "/Statefood":
        return "Statefood";

      case "/StatefoodItem":
        return "StatefoodItem";

      case "/order":
        return "Order";
    }
  };

  function handletheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function handlelogin() {
    if (!user) {
      navigate("/signIn");
    }
  }
  return (
    <nav className="navbar">
      {/* Logo + Page Name */}
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="page-title">
          <p>{getPageName()}</p>
        </div>
      </div>

      {/* Login Section */}
      <div className="navbar-right">
        <button type="submit" className="signup-btn" onClick={handletheme}>
          {theme === "light" ? "light" : "dark"}
        </button>

        <button type="submit" className="signup-btn" onClick={handlelogin}>
          {user || "SignUp"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
