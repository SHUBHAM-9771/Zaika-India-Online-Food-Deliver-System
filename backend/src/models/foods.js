import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Types.ObjectId,
    ref: "State",
    required: true,
  },
  foodname: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  foodtype: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
  },
  image: {
    type: String,
    required: true,
  },
});

const Statefood = mongoose.model("Statefood", foodSchema);
export default Statefood;
