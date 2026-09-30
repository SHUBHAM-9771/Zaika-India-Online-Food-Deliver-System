import express from "express";
import { createAdminRegistration } from "../controllers/AuthAdminRegistationController.js";

const router = express.Router();

router.post("/registration", createAdminRegistration);
export default router;
