import AdminRegistration from "../models/adminregistation.js";
import bcrypt from "bcrypt";

export const createAdminRegistration = async (req, res) => {
  try {
    // Step 1: Get data
    const { name, email, password } = req.body;
    console.log("1️⃣ Registration Body:", req.body);
    console.log("2️⃣ Name:", name);
    console.log("3️⃣ Email:", email);
    console.log("4️⃣ Password received:", password);
    console.log(req.body);

    // Step 2: Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Step 3: Check email already registered
    const existuser = await AdminRegistration.findOne({ email });
    console.log("5️⃣ Existing User:", existuser);

    if (existuser) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered",
        existuser,
      });
    }

    // PasswordHashing
    let hashingPassword = await bcrypt.hash(password, 10);

    console.log("6️⃣ Hashed Password:", hashingPassword);

    // Step 4: Create new admin
    const newUser = await AdminRegistration.create({
      name,
      email,
      password: hashingPassword,
    });

    console.log("7️⃣ New User Created:", newUser);
    console.log("8️⃣ New User Role:", newUser.role);

    const { password: _, ...userData } = newUser.toObject();

    // Step 5: Send response
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
