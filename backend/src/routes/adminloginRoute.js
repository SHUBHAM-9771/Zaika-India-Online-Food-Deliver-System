import express from "express";
import { loginAdmin, gethandle } from "../controllers/adminloginController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/getlogin", gethandle);

export default router;
