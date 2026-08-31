import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegistaion = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // step 1
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "ALL fildes are required",
      });
    }

    // console.log("Req Body", req.body);

    // step 2
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // step 3

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "Unable to create user",
      });
    }

    console.log("New User", newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to create user",
      error: error.message,
    });
  }
};

export const handlelogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Req body", req.body);

    // Step 1: Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Step 2
    const user = await User.findOne({ email });
    console.log("Email is found", user);

    console.log("Email is found", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Step 4
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "UserIS is not match",
      error: error.message,
    });
  }
};

export const getProfile = (req, res) => {
  console.log("User:", req.user);

  res.status(200).json({
    success: true,
    message: "Profile accessed successfully",
    user: req.user,
  });
};
