import React, { useState } from "react";
import { createStatefoodItem } from "../servises/statefoodItem";
import "../Style/StatefoodItem.css";
const StatefoodItem = () => {
  const [statefoodItem, setStatefoodItem] = useState({
    foodId: "",
    foodname: "",
    price: "",
    rating: "",
    itemtypes: "",
    quantity: "",
    description: "",
    image: null,
  });

  function handleChange(e) {
    const { name, value, files, type } = e.target;

    setStatefoodItem((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("foodId", statefoodItem.foodId);
      formData.append("foodname", statefoodItem.foodname);
      formData.append("price", statefoodItem.price);
      formData.append("itemTypes", statefoodItem.itemtypes);
      formData.append("quantity", statefoodItem.quantity);
      formData.append("rating", statefoodItem.rating);
      formData.append("discription", statefoodItem.description);

      if (statefoodItem.image) {
        formData.append("image", statefoodItem.image);
      }

      const response = await createStatefoodItem(formData);
      console.log("Food item created:", response);

      setStatefoodItem({
        foodId: "",
        foodname: "",
        price: "",
        rating: "",
        itemtypes: "",
        quantity: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error(
        "Error creating food item:",
        error.response?.data || error.message,
      );
    }
  }
  return (
    <main className="statefooditem-page">
      <div className="statefooditem-card">
        <h2 className="statefooditem-title">Create Food Item</h2>

        <form className="statefooditem-form" onSubmit={handleSubmit}>
          <div className="statefooditem-group">
            <label>Food ID</label>
            <input
              type="text"
              placeholder="Enter food ID"
              name="foodId"
              value={statefoodItem.foodId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="statefooditem-group">
            <label>Food Name</label>
            <input
              type="text"
              placeholder="Enter food name"
              name="foodname"
              value={statefoodItem.foodname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="statefooditem-row">
            <div className="statefooditem-group">
              <label>Price</label>
              <input
                type="number"
                min="0"
                placeholder="Enter price"
                name="price"
                value={statefoodItem.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="statefooditem-group">
              <label>Rating (0–5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Enter rating"
                name="rating"
                value={statefoodItem.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="statefooditem-row">
            <div className="statefooditem-group">
              <label>Food Type</label>
              <input
                type="text"
                placeholder="Enter food type"
                name="itemtypes"
                value={statefoodItem.itemtypes}
                onChange={handleChange}
                required
              />
            </div>

            <div className="statefooditem-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                name="quantity"
                value={statefoodItem.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="statefooditem-group">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              name="description"
              value={statefoodItem.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="statefooditem-group">
            <label>Food Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="statefooditem-submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default StatefoodItem;
