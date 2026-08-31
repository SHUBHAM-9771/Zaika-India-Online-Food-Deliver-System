import express from "express";
import {
  getProfile,
  handlelogin,
  handleRegistaion,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", handleRegistaion);
router.post("/login", handlelogin);
router.get("/profile", authMiddleware, getProfile);

export default router;
