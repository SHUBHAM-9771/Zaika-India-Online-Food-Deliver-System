import UserAdrress from "../models/address.js";

export const handleAddress = async (req, res) => {
  try {
    const {
      fullname,
      mobnumber,
      address: { house, pincode, state, city, landmark, area },
    } = req.body;

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
      fullname,
      mobnumber,
      address: { house, pincode, state, city, landmark, area },
    });

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
