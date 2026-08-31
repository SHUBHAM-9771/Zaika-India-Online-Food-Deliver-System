import mongoose from "mongoose";

const UserAddressSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, "Fullname is required"],
    },

    mobnumber: {
      type: String,
      trim: true,
      required: [true, "Mobile number is required"],
    },

    address: {
      house: {
        type: String,
        trim: true,
        required: [true, "House no is required"],
      },

      area: {
        type: String,
        trim: true,
        required: [true, "Area is required"],
      },

      landmark: {
        type: String,
        trim: true,
        required: [true, "Landmark is required"],
      },

      city: {
        type: String,
        trim: true,
        required: [true, "City is required"],
      },

      state: {
        type: String,
        trim: true,
        required: [true, "State is required"],
      },

      pincode: {
        type: String,
        trim: true,
        required: [true, "Pincode is required"],
      },
    },
  },
  { timestamps: true },
);

const UserAddress = mongoose.model("address", UserAddressSchema);

export default UserAddress;
