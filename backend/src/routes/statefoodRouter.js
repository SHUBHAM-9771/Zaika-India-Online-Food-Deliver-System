import express from "express";
import {
  getfoods,
  handlefoods,
  updatestateFoodItem,
  deletestateFoodItem,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/foods", handlefoods);
router.get("/getfoods", getfoods);
router.put("/state-foods/:id", updatestateFoodItem);
router.delete("/state-food/:id", deletestateFoodItem);

export default router;
