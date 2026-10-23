import express from "express";
import {
  deleteState,
  getStates,
  handlestate,
  updateState,
} from "../controllers/stateController.js";
import upload from "../middleware/MulterMiddleware.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/state", AuthMiddleware, upload.single("image"), handlestate);
router.get("/getAllState", getStates);
router.put("/state-food/:id", AuthMiddleware, updateState);
router.delete("/state-foods/:id", AuthMiddleware, deleteState);

export default router;
