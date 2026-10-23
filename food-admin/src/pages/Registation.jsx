import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createRegistation } from "../servises/registationService";
import "../Style/Registation.css";
const Registation = () => {
  const navigate = useNavigate();
  //  step 1 to create store state and mange input field
  // Step 1: Create state to store and manage input fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // step 2 to handeled the input field
  // Step 2: Handle input field changes
  function handleChange(e) {
    let { name, value } = e.target;

    // to create new object and keep store previous element field
    // Update only the changed field and keep the previous values
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Step 3: Handle form submission
  async function handleSubmit(e) {
    // to prevent form data when correct data is not entet then dos not refress the page
    // Prevent the browser from refreshing the page
    e.preventDefault();

    try {
      let response = await createRegistation(formData);
      console.log(response?.data?.user);

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/signIn");
    } catch (error) {
      console.log("message", error.message);
      console.log("status", error.success);
    }

    console.log(formData);
  }

  return (
    <section className="registration-section">
      <main className="registration-main">
        <div className="registration-card">
          <div className="registration-header">
            <p>Registration</p>

            <button
              type="button"
              className="registration-close"
              onClick={() => navigate(-1)}
              aria-label="Close registration"
            >
              X
            </button>
          </div>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-input-group">
              <input
                type="text"
                placeholder="AdminName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-input-group">
              <input
                type="email"
                placeholder="admin@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-input-group">
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-submit">
              <button type="submit">Register</button>
            </div>

            <div className="registration-footer">
              <p>
                Already have an account?
                <NavLink to="/signIn">Sign In</NavLink>
              </p>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Registation;
