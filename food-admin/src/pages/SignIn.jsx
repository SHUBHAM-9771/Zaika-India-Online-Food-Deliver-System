import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { adminlogin } from "../servises/registationService";
import { AuthContext } from "../context/Authcontext";
import "../Style/SignIn.css";
const SignIn = () => {
  const navigate = useNavigate();
  const { LoginUser, setAdminName } = useContext(AuthContext);
  const location = useLocation();

  console.log("Full location:", location);
  console.log("Location state:", location.state);
  console.log("Requested path:", location.state?.from?.pathname);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await adminlogin(login);
      console.log("admin login", response);
      let admin = response?.data?.admin?.name;

      if (admin) {
        let firstname = admin.charAt(0);
        LoginUser(firstname);
        setAdminName(admin);
      }

      let token = response?.data?.token;

      if (token) {
        localStorage.setItem("AdminToken", token);
      }

      setLogin({
        email: "",
        password: "",
      });

      getComponent();
    } catch (error) {
      console.log("Login error:", error);
      console.log("Message:", error.message);
      console.log("Response:", error.response?.data);
      console.log("Status:", error.response?.status);
    }
  }

  function getComponent() {
    switch (location.state?.from?.pathname) {
      case "/state":
        return navigate("/state", { replace: true });

      case "/Statefood":
        return navigate("/statefood", { replace: true });

      case "/StatefoodItem":
        return navigate("/statefoodItem", { replace: true });

      default:
        return navigate("/", { replace: true });
    }
  }

  return (
    <section className="signin-section">
      <div className="signin-parent">
        <div className="signin-card">
          <div className="signin-header">
            <div>
              <p>SignIn</p>
            </div>
            <div>
              <button
                type="button"
                className="signin-close"
                onClick={() => navigate(-1)}
                aria-label="Close sign in"
              >
                X
              </button>
            </div>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="signin-input-group">
              <input
                type="email"
                placeholder="admin@gmail.com"
                name="email"
                value={login.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signin-input-group">
              <input
                type="password"
                placeholder="Enter strong password"
                name="password"
                value={login.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signin-submit">
              <button type="submit">SignIn</button>
            </div>

            <div className="signin-footer">
              <p>
                Don't have an account?{" "}
                <NavLink to="/registation">Registration</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
