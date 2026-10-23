import React, { useState } from "react";
import "../Style/Registation.css";
import { createRegistration } from "../services/loginservice";
import { Navigate, useNavigate } from "react-router-dom";

const Registation = () => {
  // Step 1: Create state object for form data
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

    try {
      const response = await createRegistration(formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });

    return <Navigate to="/login" replace></Navigate>;
  }

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className="close">
          <button type="button" className="close-button" onClick={() => navigate("/login")}>
            X
          </button>
        </div>

        <div className="signup-title">
          <p>Registation</p>
        </div>

        <form className="signup-form" onSubmit={SubmitFormData}>
          <div className="input-group">
            <input
              className="signup-input"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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

          <p onClick={() => navigate("/login")}>
            Already have an account ? Login now
          </p>
        </form>
      </div>
    </section>
  );
};

export default Registation;
