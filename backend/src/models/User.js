import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide the user name"],
      maxLength: [100, "title cannot exceed 100 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide the uniqe email"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide the uniqe password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "password is not matching"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("user", userSchema);
