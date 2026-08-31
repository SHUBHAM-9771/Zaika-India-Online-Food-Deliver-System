import express from "express";
import { handleAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/address", handleAddress);

export default router;
