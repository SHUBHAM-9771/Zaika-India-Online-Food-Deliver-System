import express from "express";
import {
  deleteState,
  getStates,
  handlestate,
  updateState,
} from "../controllers/stateController.js";

const router = express.Router();

router.post("/state", handlestate);
router.get("/getAllState", getStates);
router.put("/state-food/:id", updateState);
router.delete("/state-foods/:id", deleteState);

export default router;
