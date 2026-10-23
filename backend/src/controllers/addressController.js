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
