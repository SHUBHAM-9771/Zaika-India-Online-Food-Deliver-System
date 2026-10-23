import React, { useState } from "react";
import { createstatefood } from "../servises/statefood";
import "../Style/Statefood.css";

const Statefood = () => {
  const [statefood, setStatefood] = useState({
    stateid: "",
    foodname: "",
    price: "",
    rating: "",
    foodtype: "",
    description: "",
    image: null,
  });

  function handleChange(e) {
    const { name, value, files, type } = e.target;

    setStatefood((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("stateid", statefood.stateid);
      formData.append("foodname", statefood.foodname);
      formData.append("price", statefood.price);
      formData.append("rating", statefood.rating);
      formData.append("foodtype", statefood.foodtype);
      formData.append("description", statefood.description);

      if (statefood.image) {
        formData.append("image", statefood.image);
      }

      const response = await createstatefood(formData);
      console.log(response);

      setStatefood({
        stateid: "",
        foodname: "",
        price: "",
        rating: "",
        foodtype: "",
        description: "",
        image: null,
      });

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="statefood-page">
      <div className="statefood-card">
        <h2 className="statefood-title">Add State Food</h2>

        <form className="statefood-form" onSubmit={handleSubmit}>
          <div className="statefood-group">
            <label htmlFor="stateid">State ID</label>
            <input
              id="stateid"
              type="text"
              placeholder="Enter State ID"
              name="stateid"
              value={statefood.stateid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="statefood-group">
            <label htmlFor="foodname">Food Name</label>
            <input
              id="foodname"
              type="text"
              placeholder="Enter food name"
              name="foodname"
              value={statefood.foodname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="statefood-row">
            <div className="statefood-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                min="0"
                placeholder="Enter price"
                name="price"
                value={statefood.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="statefood-group">
              <label htmlFor="rating">Rating (0–5)</label>
              <input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating"
                name="rating"
                value={statefood.rating}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="statefood-group">
            <label htmlFor="foodtype">Food Type</label>
            <input
              id="foodtype"
              type="text"
              placeholder="e.g. Vegetarian"
              name="foodtype"
              value={statefood.foodtype}
              onChange={handleChange}
              required
            />
          </div>

          <div className="statefood-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter food description"
              name="description"
              value={statefood.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="statefood-group">
            <label htmlFor="image">Food Image</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button className="statefood-submit" type="submit">
            Add Food
          </button>
        </form>
      </div>
    </main>
  );
};

export default Statefood;
