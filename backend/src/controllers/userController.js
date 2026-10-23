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

    // step 2
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // step 3 :- to hasing password
    const passwordhashing = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: passwordhashing,
    });

    console.log(newUser);

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

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // step  3 : Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid password",
      });
    }

    const payload = {
      email: user.email,
      _id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRETUser, {
      expiresIn: "1d",
    });

    console.log(token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User is not match",
      error: error.message,
    });
  }
};

export const gethandle = async (req, res) => {
  try {
    let user = await User.find({});
    console.log("userId", user);

    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Invalid email & Passwprd",
      });
    }

    res.status(201).json({
      success: true,
      message: "Login SuccessFully",
      user: user,
    });
  } catch (error) {
    return res.status().json({
      success: false,
      message: "Invalid userId and Password",
    });
  }
};
