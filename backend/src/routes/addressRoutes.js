import express from "express";
import {
  handleAddress,
  getAddresses,
} from "../controllers/addressController.js";
import authMiddlewareuser from "../middleware/authMiddlewareofUser.js";
const router = express.Router();

router.post("/address", authMiddlewareuser, handleAddress);
router.get("/getAddress", getAddresses);

export default router;
