import express from "express";
import {
  createorder,
  getorder,
  updateOrderStatus,
} from "../controllers/ordercontroller.js";
import authMiddlewareuser from "../middleware/authMiddlewareofUser.js";

const routes = express.Router();
routes.post("/order", authMiddlewareuser, createorder);
routes.get("/getorder", getorder);
routes.patch("/orders/:id/status", updateOrderStatus);
export default routes;
