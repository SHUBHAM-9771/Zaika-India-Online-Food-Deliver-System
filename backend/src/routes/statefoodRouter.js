import express from "express";
import {
  getfoods,
  handlefoods,
  updatestateFoodItem,
  deletestateFoodItem,
} from "../controllers/foodController.js";
import upload from "../middleware/MulterMiddleware.js";

const router = express.Router();

router.post("/statefoods", upload.single("image"), handlefoods);
router.get("/getStatefoods", getfoods);
router.put("/state-foods/:id", updatestateFoodItem);
router.delete("/state-food/:id", deletestateFoodItem);

export default router;
