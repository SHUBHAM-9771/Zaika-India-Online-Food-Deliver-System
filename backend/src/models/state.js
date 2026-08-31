import mongoose from "mongoose";

const stateSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

const State = mongoose.model("state", stateSchema);

export default State;
