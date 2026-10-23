import React, { useContext, useState } from "react";
import "../Style/Signup.css";
import { createLogin } from "../services/loginservice";
import { useNavigate } from "react-router-dom";
import { PopupContext } from "../context/PopupContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, adminName, setAdminName } =
    useContext(PopupContext);
  // Step 1: Create state object for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Step 2: Get name and value from the changed input
  function handleChange(e) {
    const { name, value } = e.target;
    // to check
    console.log(name);
    console.log(value);

    // Create a new object, keep previous data, and update the changed input
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Step 3: Handle form submission and reset form data
  async function SubmitFormData(e) {
    e.preventDefault();

    console.log("FORM DATA BEFORE API:", formData);

    try {
      console.log("1. FORM DATA:", formData);

      let response = await createLogin(formData);
      console.log("LOGIN RESPONSE:", response);

      if (response.data.success) {
        // Get JWT token
        let token = response?.data.token;
        // save token in Browser
        localStorage.setItem("AdminToken", token);

        // Get admin name
        let name = response.data.admin.name;
        let firstletter = name.charAt(0).toUpperCase();
        setAdminName(firstletter);
        setLoggedIn(true);
        navigate("/state");
      }
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Server message:", error.response?.data);
    }
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className="close">
          <button
            type="button"
            className="close-button"
            onClick={() => navigate("/")}
          >
            X
          </button>
        </div>

        <div className="signup-title">
          <p>Sign Up</p>
        </div>

        <form className="signup-form" onSubmit={SubmitFormData}>
          <div className="input-group">
            <input
              className="signup-input"
              type="email"
              placeholder="email@.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              className="signup-input"
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-options">
            <span className="checkbox-wrapper">
              <input className="remember-checkbox" type="checkbox" />
              <p>Forget password</p>
            </span>
          </div>

          <div className="submit-group">
            <input className="signup-submit" type="submit" value="Sign Up" />
          </div>

          <p onClick={() => navigate("/registation")}>
            Don't have an account ? registation
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
