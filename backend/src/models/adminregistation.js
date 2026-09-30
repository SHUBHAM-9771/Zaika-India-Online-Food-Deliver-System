import mongoose from "mongoose";

const AdminRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 charecter"],
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true },
);

const AdminRegistration = mongoose.model(
  "AdminRegistration",
  AdminRegistrationSchema,
);
export default AdminRegistration;
