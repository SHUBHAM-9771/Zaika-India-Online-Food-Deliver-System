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

export const updateAddress = async (req, res) => {
  try {
    // step 1 : URL se address ID lena
    const { id } = req.params;

    //step2 : ID validate karna
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    // step3 : sirf allowed fields define karna
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

    //step 4 : Empty update object banana
    const updateDate = {};

    // step 5 request me bheji gayi fields select karo
    for (let field of allowedfields) {
      if (field === "fullname" || field === "mobnumber") {
        if (req.body[field] !== undefined) {
          updateDate[field] = req.body[field];
        } else if (field.startsWith("address.")) {
          const nestedfield = field.split(".")[1];
          if (req.body.address?.[nestedfield] !== undefined) {
            updateDate[field] = req.body.address[nestedfield];
          }
        }
      }
    }

    if (Object.keys(updateDate).length === 0) {
      return res.status(401).json({
        success: false,
        message: "No valid field provided for updated",
      });
    }

    // step 7 update address
    const address = await UserAddress.findOneAndUpdate(
      {
        _id: id,
        UserId: req.user.id,
      },
      {
        $set: updateDate,
      },
      {
        new: true,
        runValidation: true,
      },
    );

    // step 8  address nahi mila
    if (!address) {
      return res.status(404).json({
        success: true,
        message: "address not found",
      });
    }

    // step 9 Success responce
    return res.status(200).json({
      success: true,
      message: "address update Successfully",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to updated address",
    });
  }
};
