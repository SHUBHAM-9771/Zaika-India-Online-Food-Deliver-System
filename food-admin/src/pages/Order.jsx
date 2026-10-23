import React, { useState, useEffect } from "react";
import { getorder, updateSingleId } from "../servises/orderService";
import "../Style/Order.css";

const Order = () => {
  const [order, setOrder] = useState([]);
  // const [updateStatuse, setUpdateStatuse] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  console.log(order);

  async function getorders() {
    try {
      const response = await getorder();
      console.log(response);
      setOrder(response?.data?.order || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getorders();
  }, []);

  async function handleStatus(orderId, newstatus) {
    setUpdatingId(orderId);

    try {
      let response = await updateSingleId(orderId, newstatus);
      console.log("Requested status:", newstatus);
      console.log("Updated order:", response.data.order);

      const updatedOrder = response?.data?.order;

      if (updatedOrder) {
        setOrder((prevOrder) =>
          prevOrder.map((item) => (item._id === orderId ? updatedOrder : item)),
        );
      } else {
        await getorders();
      }
      alert("order Status updated successfully");
    } catch (error) {
      console.error("Updating status error:", error);
      alert("order status update nahi hua");
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <section className="order-section">
      <main className="order-container">
        {order.map((item) => (
          <div className="order-card" key={item._id}>
            {/* Items */}
            <div className="order-items">
              <h3 className="order-heading">Items</h3>

              {item.items?.map((food, index) => (
                <div className="food-item" key={index}>
                  <div className="food-image">
                    <img src={food.image} alt={food.foodName} />
                  </div>

                  <div className="food-details">
                    <p className="food-name">{food.foodName}</p>
                  </div>

                  <div>
                    <p className="food-quantity">Quantity: {food.quantity}</p>
                    <p className="food-quantity">subtotal: {food.subtotal}</p>
                  </div>
                </div>
              ))}

              <p className="food-price">Total Amount: ₹{item.totalAmount}</p>
            </div>

            {/* Address */}
            <div className="order-address">
              <h3 className="order-heading">Address</h3>

              <div className="address-details">
                <p>
                  <strong>FullName:</strong> {item?.fullname || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {item?.userId.email || "N/A"}
                </p>

                <p>
                  <strong>landmark :</strong>
                  {item?.landmark || "N/A"}
                </p>

                <p>
                  <strong>State:</strong>
                  {item?.state || "N/A"}
                </p>

                <p>
                  <strong>City:</strong>
                  {item?.city || "N/A"}
                </p>

                <p>
                  <strong>Pincode:</strong>
                  {item?.pincode || "N/A"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="order-status">
              <h3 className="order-heading">Status</h3>

              {/* <p className={`status ${item.status?.toLowerCase()}`}>
                {item?.paymentStatus}
              </p> */}
              <div>
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatus(item._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default Order;
