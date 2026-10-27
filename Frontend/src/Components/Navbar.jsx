// import "../Style/Navbar.css";
// import { useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../../public/logo.png";

// import { SignUp } from "../Pages/SignUp";
// import Registation from "../Pages/Registation";
// import { ThemeContext } from "../Context/TheamContext/ThemeContext";
// import { PopupContext } from "../Context/PopupContext/PopoupContext";
// import { CartContext } from "../Context/CartContext/CartProvider";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const { theme, setTheme } = useContext(ThemeContext);
//   const { state } = useContext(CartContext);

//   const { Signup, setSignup, showRegister, setShowRegister, user, LogoutUser } =
//     useContext(PopupContext);

//   const userName =
//     typeof user === "string"
//       ? user
//       : user?.name || user?.username || "My Account";

//   function handleTheme() {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   }

//   function handleSignUp() {
//     if (user) {
//       navigate("/my-account");
//       return;
//     }

//     setSignup((prev) => !prev);
//   }

//   function handleAddToCart() {
//     if (!state || state.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     navigate("/AddToCart");
//   }

//   return (
//     <div>
//       <nav className="cointaine">
//         <div
//           className="logo"
//           onClick={() => navigate("/")}
//           role="button"
//           tabIndex={0}
//         >
//           <img src={logo} loading="lazy" alt="Zaika India" />
//         </div>

//         <ul className="nav-link">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/menu">Search</NavLink>
//           <NavLink to="/offers">Offers</NavLink>
//           <NavLink to="/footer">Footer</NavLink>
//         </ul>

//         <div className="nav-button">
//           <button type="button" className="log" onClick={handleAddToCart}>
//             AddToCart
//           </button>

//           <button
//             type="button"
//             className="darks"
//             onClick={handleTheme}
//             aria-label="Toggle theme"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>

//           {user ? (
//             <button
//               type="button"
//               className="profile-nav-button"
//               onClick={handleSignUp}
//             >
//               <span className="nav-user-avatar">
//                 {userName.charAt(0).toUpperCase()}
//               </span>
//               <span className="nav-user-name">{userName}</span>
//               <span>▾</span>
//             </button>
//           ) : (
//             <button type="button" className="log" onClick={handleSignUp}>
//               SignUp
//             </button>
//           )}
//         </div>
//       </nav>

//       {Signup && <SignUp />}
//       {showRegister && <Registation />}
//     </div>
//   );
// };

// export default Navbar;
import "../Style/Navbar.css";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";

import { SignUp } from "../Pages/SignUp";
import Registation from "../Pages/Registation";
import { ThemeContext } from "../Context/TheamContext/ThemeContext";
import { PopupContext } from "../Context/PopupContext/PopoupContext";
import { CartContext } from "../Context/CartContext/CartProvider";

const Navbar = () => {
  const navigate = useNavigate();

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);
  const { state } = useContext(CartContext);

  const { Signup, setSignup, showRegister, setShowRegister, user, LogoutUser } =
    useContext(PopupContext);

  const userName =
    typeof user === "string"
      ? user
      : user?.name || user?.username || "My Account";

  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function handleSignUp() {
    if (user) {
      setShowAccountMenu((prev) => !prev);
      return;
    }

    setSignup((prev) => !prev);
  }

  function handleAccountNavigation(path) {
    navigate(path);
    setShowAccountMenu(false);
  }

  function handleLogout() {
    LogoutUser();
    setShowAccountMenu(false);
    setSignup(false);
    setShowRegister(false);
    navigate("/");
  }

  function handleAddToCart() {
    if (!state || state.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate("/AddToCart");
  }

  return (
    <div>
      <nav className="cointaine">
        <div
          className="logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") navigate("/");
          }}
        >
          <img src={logo} loading="lazy" alt="Zaika India" />
        </div>

        <ul className="nav-link">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Search</NavLink>
          <NavLink to="/offers">Offers</NavLink>
          <NavLink to="/footer">Footer</NavLink>
        </ul>

        <div className="nav-button">
          <button type="button" className="log" onClick={handleAddToCart}>
            AddToCart
          </button>

          <button
            type="button"
            className="darks"
            onClick={handleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <div className="account-dropdown-wrapper">
              <button
                type="button"
                className="profile-nav-button"
                onClick={handleSignUp}
                aria-expanded={showAccountMenu}
                aria-haspopup="true"
              >
                <span className="nav-user-avatar">
                  {userName.charAt(0).toUpperCase()}
                </span>

                <span className="nav-user-name">{userName}</span>

                <span>{showAccountMenu ? "▴" : "▾"}</span>
              </button>

              {showAccountMenu && (
                <div className="account-dropdown">
                  <div className="dropdown-user-info">
                    <strong>{userName}</strong>
                    <span>Manage your account</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAccountNavigation("/my-account")}
                  >
                    👤 My Profile
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAccountNavigation("/my-account/orders")
                    }
                  >
                    📦 My Orders
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAccountNavigation("/my-account/favourites")
                    }
                  >
                    ❤️ Favourites
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAccountNavigation("/my-account/addresses")
                    }
                  >
                    📍 My Addresses
                  </button>

                  <button
                    type="button"
                    className="dropdown-logout"
                    onClick={handleLogout}
                  >
                    ↪ Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" className="log" onClick={handleSignUp}>
              SignUp
            </button>
          )}
        </div>
      </nav>

      {Signup && <SignUp />}
      {showRegister && <Registation />}
    </div>
  );
};

export default Navbar;
