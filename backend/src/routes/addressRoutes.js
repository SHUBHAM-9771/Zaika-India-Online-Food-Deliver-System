import express from "express";
import {
  handleAddress,
  getAddresses,
  updateAddress,
} from "../controllers/addressController.js";
import authMiddlewareuser from "../middleware/authMiddlewareofUser.js";
const router = express.Router();

router.post("/address", authMiddlewareuser, handleAddress);
router.get("/getAddress", getAddresses);
router.patch("/edit-address/:id", updateAddress);

export default router;
