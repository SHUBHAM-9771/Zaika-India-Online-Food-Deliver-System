import React, { useContext } from "react";
import { useState } from "react";
import "../Style/AddToCart.css";
import { CartContext } from "../Context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const { item, setItem } = useContext(CartContext);

  const navigation = useNavigate();

  function Decrement(id) {
    // console.log("Decrement", id);
    setItem((prev) =>
      prev.map((foodItem) => {
        return foodItem.id === id
          ? {
              ...foodItem,
              quantity: foodItem.quantity - 1,
            }
          : foodItem;
      }),
    );
  }

  function Increment(id) {
    console.log("increment", id);
    setItem((prev) =>
      prev.map((foodItem) => {
        return foodItem.id === id
          ? {
              ...foodItem,
              quantity: foodItem.quantity + 1,
            }
          : foodItem;
      }),
    );
  }

  function remove(id) {
    console.log("Remove id", id);
    setItem((prev) =>
      prev.filter((foodItem) => {
        return foodItem.id !== id;
      }),
    );
  }

  let total = item.reduce((acc, current) => {
    return acc + current.price * current.quantity;
  }, 0);

  let addDeliveryCharge = total + 40;

  console.log("total", total);

  return (
    <section className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <span>{item.length}</span>
        </div>

        {/* Cart Item */}
        <div className="cart-item">
          {item.map((foodItem) => (
            <div className="cart-item" key={foodItem.id}>
              <img src={foodItem.img} alt={foodItem.name} />

              <div className="cart-info">
                <h3>{foodItem.name}</h3>

                <p className="cart-rating">⭐ {foodItem.rating}</p>

                <p className="cart-price">
                  ₹{foodItem.price * foodItem.quantity}
                </p>

                <div className="quantity">
                  <button onClick={() => Decrement(foodItem.id)}>-</button>

                  <span>{foodItem.quantity}</span>

                  <button onClick={() => Increment(foodItem.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => remove(foodItem.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="bill">
          <h3>Bill Details</h3>

          <div className="bill-row">
            <span>Item Total</span>
            <span>₹{total}</span>
          </div>

          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>₹40</span>
          </div>

          <hr />

          <div className="bill-row total">
            <span>Total</span>
            <span>₹{addDeliveryCharge}</span>
          </div>
        </div>

        {/* Order Button */}
        <button className="order-btn" onClick={() => navigation("/address")}>
          PLACE PRE-ORDER
        </button>
      </div>
    </section>
  );
};

export default AddToCart;
