import AdminRegistration from "../models/adminregistation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    // Step 1: Get email and password
    console.log("🔥 Controller started");

    console.log("🔥 req.body:", req.body);

    const { email, password } = req.body;

    console.log("🔥 After destructuring");
    console.log("🔥 email:", email);
    console.log("🔥 password exists:", !!password);

    // Step 2: Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Step 3: Find admin by email
    const exist = await AdminRegistration.findOne({ email });

    console.log("userfound", exist);
    console.log("UserRole", exist?.role);
    if (!exist) {
      return res.status(400).json({
        success: false,
        message: "Admin is not found",
      });
    }

    // to cpmpare incoming password with hashing Password
    let isMatch = await bcrypt.compare(password, exist.password);
    console.log("Password Match", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //// Store information from database inside JWT payload

    const paylod = {
      id: exist._id,
      email: exist.email,
      role: exist.role,
    };

    console.log("JWT Paylod", paylod);

    // step 5 :- Generet JWT token
    const token = jwt.sign(paylod, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    console.log("Generate Token", token);

    const { password: _, ...adminData } = exist.toObject();
    // Step 6: Login successful
    res.status(200).json({
      success: true,
      message: "Admin login Successfully",
      token: token,
      admin: adminData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
