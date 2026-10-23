import React, { useState } from "react";
import "../Style/State.css";
import { createstate } from "../servises/state";

const State = () => {
  const [state, setState] = useState({
    state: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const formData = new FormData();
      formData.append("state", state.state);

      if (state.image) {
        formData.append("image", state.image);
      }

      // Check FormData before sending
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await createstate(formData);

      console.log("Server response:", response.data);

      alert("State successfully added!");

      setState({
        state: "",
        image: null,
      });

      form.reset();
    } catch (error) {
      console.error(
        "Error submitting state:",
        error.response?.data || error.message,
      );

      alert("Data send nahi hua. Console mein error check karein.");
    }
  };

  return (
    <main className="state-page">
      <div className="state-card">
        <h2 className="state-title">Add State</h2>

        <form className="state-form" onSubmit={handleSubmit}>
          <div className="state-form-group">
            <label htmlFor="state-name">State Name</label>
            <input
              id="state-name"
              type="text"
              placeholder="Enter state name"
              name="state"
              value={state.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="state-form-group">
            <label htmlFor="state-image">State Image</label>
            <input
              id="state-image"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              required
            />
          </div>

          <button className="state-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default State;
