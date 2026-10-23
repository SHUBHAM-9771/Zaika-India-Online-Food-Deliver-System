import UserOrder from "../models/order.js";

export const createorder = async (req, res) => {
  try {
    // step 1 get frontend data
    // console.log(req.user);
    // console.log(req.body);
    const {
      items,
      paymentmethod,
      userId,
      fullname,
      mobileNo,
      houseNo,
      landmark,
      pincode,
      state,
      city,
      deliveryCharge,
      subtotal,
      totaltax,
      totalAmount,
    } = req.body;

    // step 2 Check validation
    if (!userId) {
      throw new Error("userId is required");
    }

    if (!items || items.length === 0) {
      throw new Error("items is required");
    }

    if (
      !paymentmethod ||
      !fullname ||
      !mobileNo ||
      !houseNo ||
      !landmark ||
      !pincode ||
      !state ||
      !city ||
      !deliveryCharge ||
      !subtotal ||
      !totaltax ||
      !totalAmount
    ) {
      throw new Error("All field is required");
    }
    // step 3 save and retrive data from database

    let order = await UserOrder.create({
      items,
      userId,
      paymentmethod,
      fullname,
      mobileNo,
      houseNo,
      landmark,
      pincode,
      state,
      city,
      deliveryCharge,
      subtotal,
      totaltax,
      totalAmount,
    });
    res.status(201).json({
      success: false,
      message: "Order create successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "invalid orders",
      error: error.message,
    });
  }
};

export const getorder = async (req, res) => {
  try {
    // step 1 get data from database

    const order = await UserOrder.find({}).populate("userId");
    // .populate("userId");
    // .populate("addressId");
    console.log(order);

    if (order.length === 0) {
      return res.status(401).json({
        success: false,
        message: "no order found",
        order: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "order fetch successfully",
      order: order,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "faild to fetch orders",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    let { id } = req.params;
    const { orderStatus } = req.body;
    console.log("id", id);
    console.log("status", orderStatus);

    const updatedOrder = await UserOrder.findByIdAndUpdate(
      id,
      {
        $set: { orderStatus: orderStatus },
      },
      { new: true, runValidators: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("Updated orderStatus:", updatedOrder.orderStatus);

    return res.status(200).json({
      success: true,
      message: "order Statuse updated Successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "faild to update Statuse",
      error: error.message,
    });
  }
};
