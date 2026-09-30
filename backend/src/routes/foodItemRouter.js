import express from "express";
import {
  getfoodItem,
  handlefoodItem,
  updatefoodItems,
  deletefoodItems,
} from "../controllers/itemController.js";
import upload from "../middleware/MulterMiddleware.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/foodItem",
  AuthMiddleware,
  upload.single("image"),
  handlefoodItem,
);
router.get("/getfoodItem", getfoodItem);
router.put("/food-items/:id", AuthMiddleware, updatefoodItems);
router.delete("/food-item/:id", AuthMiddleware, deletefoodItems);

export default router;
