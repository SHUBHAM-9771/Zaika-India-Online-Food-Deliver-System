import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required because unique"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password must be at least 8 length"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", UserSchema);
export default User;
