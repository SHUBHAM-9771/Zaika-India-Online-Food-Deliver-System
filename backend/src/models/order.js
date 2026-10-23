import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },

        foodname: {
          type: String,
          required: true,
          trim: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        subtotal: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    paymentmethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },

    houseNo: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: Number,
      required: true,
      trim: true,
    },

    deliveryCharge: {
      type: String,
      required: true,
      min: 0,
      default: "free",
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    totaltax: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const UserOrder = mongoose.model("Order", orderSchema);

export default UserOrder;
