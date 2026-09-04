import React, { useContext } from "react";
import { useState } from "react";
import "../Style/AddToCart.css";
import { CartContext } from "../Context/CartContext/CartContext";

const AddToCart = () => {
  const { item, setItem } = useContext(CartContext);
  console.log(item);

  function handleIncrement(id) {
    console.log(id);
    setItem((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function handleDecriment(id) {
    setItem((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item,
      ),
    );
  }

  function handleRemove(id) {
    setItem((prev) => prev.filter((item) => item._id !== id));
  }

  //===============================================
  // Caluculate Item Price
  let itemTotal = item.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  console.log("TotalPrice", itemTotal);
  //==============================================

  //=======================================================
  let deliveryCharge = itemTotal < 500 ? 40 : 0;
  //=========================================================

  //===================================================
  // calculate Total Price
  let totalPrice = itemTotal + deliveryCharge;

  console.log(totalPrice);
  //===================================================
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
          {item.map((items) => {
            return (
              <div className="cart-item" key={items._id}>
                <img src={items.image} alt="" />
                <div className="cart-info">
                  <h3>aaaaa</h3>

                  <p className="cart-rating">⭐ {items.rating}</p>

                  <p className="cart-price">{items.price}</p>

                  <div className="quantity">
                    <button onClick={() => handleDecriment(`${items._id}`)}>
                      -
                    </button>

                    <span>{items.quantity}</span>

                    <button onClick={() => handleIncrement(`${items._id}`)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(`${items._id}`)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* Bill */}
        <div className="bill">
          <h3>Bill Details</h3>

          <div className="bill-row">
            <span>Item Total</span>
            <span>₹ {itemTotal}</span>
          </div>

          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>₹ {diliveryCharge}</span>
          </div>

          <hr />

          <div className="bill-row total">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* Order Button */}
        <button>PLACE PRE-ORDER</button>
      </div>
    </section>
  );
};

export default AddToCart;
