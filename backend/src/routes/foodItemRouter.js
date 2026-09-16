import express from "express";
import {
  getfoodItem,
  handlefoodItem,
  updatefoodItems,
  deletefoodItems,
} from "../controllers/itemController.js";
import upload from "../middleware/MulterMiddleware.js";

const router = express.Router();

router.post("/foodItem", upload.single("image"), handlefoodItem);
router.get("/getfoodItem", getfoodItem);
router.put("/food-items/:id", updatefoodItems);
router.delete("/food-item/:id", deletefoodItems);

export default router;
