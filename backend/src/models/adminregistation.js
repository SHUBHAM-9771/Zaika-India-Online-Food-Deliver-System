import mongoose from "mongoose";

const AdminRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name fiels is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 charecter"],
    },
  },
  { timestamps: true },
);

const AdminRegistration = mongoose.model(
  "AdminRegistration",
  AdminRegistrationSchema,
);
export default AdminRegistration;
