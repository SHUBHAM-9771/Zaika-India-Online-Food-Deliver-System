import React, { useState } from "react";
import "../Style/State.css";

const State = () => {
  const [state, setState] = useState({
    state: "",
    image: null,
  });

  function handleChange(e) {
    const { name, value, files, type } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(state);

    setState({
      state: "",
      image: null,
    });

    // Reset file input after submission
    e.target.reset();
  }

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
