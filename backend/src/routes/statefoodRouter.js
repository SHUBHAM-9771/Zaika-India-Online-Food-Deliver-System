import express from "express";
import {
  getfoods,
  handlefoods,
  updatestateFoodItem,
  deletestateFoodItem,
} from "../controllers/foodController.js";
import upload from "../middleware/MulterMiddleware.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/statefoods", AuthMiddleware, upload.single("image"), handlefoods);
router.get("/getStatefoods", getfoods);
router.put("/state-foods/:id", AuthMiddleware, updatestateFoodItem);
router.delete("/state-food/:id", AuthMiddleware, deletestateFoodItem);

export default router;
