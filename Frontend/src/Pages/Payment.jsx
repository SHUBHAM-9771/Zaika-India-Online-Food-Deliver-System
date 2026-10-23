import React, { useEffect, useState } from "react";
import { procedeorder } from "../services/Payment";
import "../Style/Payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [paymentoption, setPaymentOption] = useState("COD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const cartDetails = JSON.parse(localStorage.getItem("cartdetails")) || [];

      const savedAddress =
        JSON.parse(localStorage.getItem("selectedAddress")) || [];

      // Cart hamesha array rahe
      setCart(Array.isArray(cartDetails) ? cartDetails : [cartDetails]);

      // Address object ya array, dono handle honge
      setAddress(Array.isArray(savedAddress) ? savedAddress : [savedAddress]);
    } catch (error) {
      console.error("Failed to load checkout details:", error);
      setCart([]);
      setAddress([]);
    }
  }, []);

  const cartData = cart[0];
  const addressData = address[0];

  const orderdetails = {
    items: (cartData?.items || []).map((food) => ({
      productId: food._id,
      image: food.image,
      foodname: food.foodname,
      quantity: food.quantity,
      price: food.price,
      subtotal: Number(food.price * food.quantity),
    })),
    paymentmethod: paymentoption,
    userId: addressData?.userId._id,
    fullname: addressData?.fullname,
    mobileNo: addressData?.mobileNo,
    houseNo: addressData?.address?.house,
    landmark: addressData?.address?.landmark,
    pincode: addressData?.address?.pincode,
    state: addressData?.address?.state,
    city: addressData?.address?.city,
    deliveryCharge:
      cartData?.DeleveryCharge === 0 ? "free" : cartData?.DeleveryCharge,
    subtotal: Number(cartData?.subtotal),
    totaltax: Number(cartData?.totaltax),
    totalAmount: Number(cartData?.totalAmount),
  };

  function handleoption(e) {
    setPaymentOption(e.target.value);
  }

  async function handlepayment() {
    try {
      let token = localStorage.getItem("UserToken");

      if (token) {
        console.log("API call Start");
        let response = await procedeorder(orderdetails);
        ["cart", "cartdetails", "totalAmount"].forEach((key) => {
          localStorage.removeItem(key);
        });

        navigate("/");
      }

      console.log("API call Start");

      console.log("Order details:", orderdetails);
      alert("Order details ready. Connect your order API to place the order.");
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
    }
    // finally {
    //   setLoading(false);
    // }
  }

  return (
    <section className="payment-page">
      <h1 className="payment-heading">Checkout</h1>

      <div className="payment-layout">
        {/* Left: Order and Payment */}
        <div className="payment-left">
          <div className="payment-card">
            <h2>Your Order</h2>

            {cartData?.items?.length ? (
              cartData.items.map((food, index) => {
                const quantity = food.quantity ?? food.quentity ?? 0;

                return (
                  <div className="payment-food" key={food._id || index}>
                    <img src={food.image} alt={food.foodname || "Food"} />

                    <div className="payment-food-info">
                      <h3>{food.foodname}</h3>
                      <p>Quantity: {quantity}</p>
                      <span>₹{food.price} each</span>
                    </div>

                    <strong>₹{food.price * quantity}</strong>
                  </div>
                );
              })
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          <div className="payment-card">
            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentoption === "COD"}
                onChange={handleoption}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentoption === "Online"}
                onChange={handleoption}
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        {/* Right: Address and Bill */}
        <div className="payment-right">
          <div className="payment-card">
            <h2>Delivery Address</h2>

            {addressData?.address ? (
              <div className="payment-address">
                <p>
                  <strong>Full Name: </strong>
                  {addressData.fullname}
                </p>

                <p>
                  <strong>Mobile: </strong>
                  {addressData.mobileNo ?? addressData.mobnumber}
                </p>

                <p>
                  <strong>House: </strong>
                  {addressData.address.house}
                </p>

                <p>
                  <strong>Area: </strong>
                  {addressData.address.area}
                </p>

                <p>
                  <strong>Landmark: </strong>
                  {addressData.address.landmark || "N/A"}
                </p>

                <p>
                  <strong>City: </strong>
                  {addressData.address.city}
                </p>

                <p>
                  <strong>State: </strong>
                  {addressData.address.state}
                </p>

                <p>
                  <strong>Pincode: </strong>
                  {addressData.address.pincode}
                </p>
              </div>
            ) : (
              <p>No delivery address found.</p>
            )}

            <button
              className="change-address-btn"
              type="button"
              onClick={() => {
                window.location.href = "/address";
              }}
            >
              Change Address
            </button>
          </div>

          <div className="payment-card">
            <h2>Bill Summary</h2>

            <div className="payment-bill-row">
              <span>Subtotal</span>
              <span>₹{cartData?.subtotal ?? 0}</span>
            </div>

            <div className="payment-bill-row">
              <span>Tax (18%)</span>
              <span>₹{cartData?.totaltax ?? 0}</span>
            </div>

            <div className="payment-bill-row">
              <span>Delivery Fee</span>
              <span>
                ₹{cartData?.DeleveryCharge ?? cartData?.deliveryCharge ?? 0}
              </span>
            </div>

            <div className="payment-bill-total">
              <span>Total Amount</span>
              <strong>₹{cartData?.totalAmount ?? 0}</strong>
            </div>

            <button
              className="place-order-btn"
              type="button"
              onClick={handlepayment}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Place Order · ₹${cartData?.totalAmount ?? 0}`}
            </button>

            <p className="payment-note">
              Your order total includes the delivery fee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
