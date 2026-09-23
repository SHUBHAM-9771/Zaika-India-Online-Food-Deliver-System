import express from "express";
import { loginAdmin } from "../controllers/adminloginController.js";

const router = express.Router();

router.post("/getAdmin", loginAdmin);

export default router;
