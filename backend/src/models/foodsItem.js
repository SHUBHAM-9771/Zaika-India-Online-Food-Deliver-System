import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Types.ObjectId,
    ref: "statefoods",
    required: true,
  },

  foodname: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  price: {
    type: Number,
    required: true,
  },

  itemTypes: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

export default FoodItem;
