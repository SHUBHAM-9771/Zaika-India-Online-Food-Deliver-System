import AdminRegistration from "../models/adminregistation.js";

export const loginAdmin = async (req, res) => {
  try {
    // Step 1: Get email and password
    const { email, password } = req.body;

    // Step 2: Check fields
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Step 3: Find admin by email
    const exist = await AdminRegistration.findOne({ email });
    if (!exist) {
      return res.status(400).json({
        success: false,
        message: "Admin is not found",
      });
    }

    // Step 4: Check password
    if (exist.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const { password: _, ...adminData } = exist.toObject();
    // Step 5: Login successful
    res.status(200).json({
      success: true,
      message: "Admin login Successfully",
      admin: adminData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
