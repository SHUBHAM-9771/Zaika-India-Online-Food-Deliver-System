import mongoose from "mongoose";
import UserAdrress from "../models/address.js";

export const handleAddress = async (req, res) => {
  try {
    const {
      fullname,
      mobnumber,
      address: { house, pincode, state, city, landmark, area },
    } = req.body;

    // console.log(req.body);

    if (
      !fullname ||
      !mobnumber ||
      !house ||
      !pincode ||
      !state ||
      !city ||
      !landmark ||
      !area
    ) {
      return res.status(500).json({
        success: false,
        message: "all fields Are Required",
      });
    }

    // ! step 3
    let newAddress = await UserAdrress.create({
      userId: req.user._id,
      fullname,
      mobnumber,
      address: { house, pincode, state, city, landmark, area },
    });

    await newAddress.populate("userId");

    res.status(201).json({
      success: true,
      message: "Address register Successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "unable to created",
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await UserAdrress.find({});

    if (addresses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No addresses found",
        address: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      address: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};


import mongoose from "mongoose";
import UserAddress from "../models/UserAddress.js";

export const updateAddress = async (req, res) => {
  try {
    // Step 1: URL se address ID lena
    const { id } = req.params;

    // Step 2: ID validate karna
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    // Step 3: Allowed fields
    const allowedfields = [
      "fullname",
      "mobnumber",
      "address.house",
      "address.pincode",
      "address.state",
      "address.city",
      "address.landmark",
      "address.area",
    ];

    // Step 4: Empty update object
    const updateDate = {};

    // Step 5: Sirf bheji gayi allowed fields select karna
    for (const field of allowedfields) {
      if (field === "fullname" || field === "mobnumber") {
        if (req.body[field] !== undefined) {
          updateDate[field] = req.body[field];
        }
      } else if (field.startsWith("address.")) {
        const nestedfield = field.split(".")[1];

        if (req.body.address?.[nestedfield] !== undefined) {
          updateDate[field] = req.body.address[nestedfield];
        }
      }
    }

    // Step 6: Koi valid field nahi mili
    if (Object.keys(updateDate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    // Step 7: Address update karna
    const address = await UserAddress.findOneAndUpdate(
      {
        _id: id,
        UserId: req.user.id, // Schema aur auth middleware se verify karo
      },
      {
        $set: updateDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Step 8: Address nahi mila
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Step 9: Success response
    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Update address error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
};

