import React, { useContext, useMemo } from "react";
import { CartContext } from "../Context/CartContext/CartProvider";
import { useNavigate } from "react-router-dom";
import "../Style/AddToCart.css";

const AddToCart = () => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const total = useMemo(() => {
    return state.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }, [state]);

  const taxRate = 18;
  const totaltax = (total * taxRate) / 100;
  const DeleveryCharge = total + totaltax < 500 ? 40 : 0;
  const totalAmount = total + totaltax + DeleveryCharge;

  function handleAddress() {
    if (!state || state.length === 0) {
      alert("your cart is empty:");
      return;
    }

    const CheckoutDetails = [
      {
        items: state,
        subtotal: total,
        taxRate,
        totaltax,
        DeleveryCharge,
        totalAmount,
      },
    ];

    localStorage.setItem("cartdetails", JSON.stringify(CheckoutDetails));
    navigate("/address");
  }

  return (
    <div className="cart-page">
      <header className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        <main className="cart-layout">
          {/* Cart Items */}
          <section className="cart-items-section">
            <div className="cart-items-box">
              {state?.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={item.image}
                    alt={item.foodname}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h2 className="cart-item-name">{item.foodname}</h2>

                    <p className="cart-item-description">{item.description}</p>

                    <p className="cart-item-price">
                      ₹ {item.price * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="cart-quantity-controls">
                    <button
                      type="button"
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        dispatch({
                          type: "DECREMENT",
                          payload: item._id,
                        })
                      }
                    >
                      -
                    </button>

                    <span className="quantity-value">{item.quantity}</span>

                    <button
                      type="button"
                      className="quantity-btn quantity-btn-add"
                      aria-label="Increase quantity"
                      onClick={() =>
                        dispatch({
                          type: "INCREMENT",
                          payload: item._id,
                        })
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="remove-item-btn"
                      aria-label="Remove item"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item._id,
                        })
                      }
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}

              {state.length === 0 && (
                <p className="empty-cart">Your cart is empty.</p>
              )}
            </div>
          </section>

          {/* Order Summary */}
          <aside className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <p>Subtotal</p>
                <p className="summary-value">₹ {total.toFixed(2)}</p>
              </div>

              <div className="summary-row">
                <p>Tax &amp; Fees</p>
                <p className="summary-value">₹ {totaltax.toFixed(2)}</p>
              </div>

              <div className="summary-row">
                <p>Delivery Fee</p>
                <p className="delivery-value">
                  {DeleveryCharge === 0 ? "Free" : `₹ ${DeleveryCharge}`}
                </p>
              </div>

              <div className="summary-total">
                <div className="summary-row">
                  <p>Total</p>
                  <p>₹ {totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleAddress}
              >
                Proceed to Checkout
              </button>

              <p className="summary-note">
                Taxes and fees included in the total shown.
              </p>
            </div>
          </aside>
        </main>
      </header>
    </div>
  );
};

export default AddToCart;
