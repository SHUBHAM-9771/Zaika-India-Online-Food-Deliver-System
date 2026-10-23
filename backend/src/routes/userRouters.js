import express from "express";
import {
  handlelogin,
  handleRegistaion,
  gethandle,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/userRegistation", handleRegistaion);
router.post("/userlogin", handlelogin);
router.get("/getUser", gethandle);

export default router;
