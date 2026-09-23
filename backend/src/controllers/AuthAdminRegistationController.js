import AdminRegistration from "../models/adminregistation.js";

export const createAdminRegistration = async (req, res) => {
  try {
    // Step 1: Get data
    const { name, email, password } = req.body;

    // Step 2: Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Step 3: Check email already registered
    const existuser = await AdminRegistration.findOne({ email });

    if (existuser) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered",
        existuser,
      });
    }

    // Step 4: Create new admin
    const newUser = await AdminRegistration.create({
      name,
      email,
      password,
    });

    // Step 5: Send response
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
