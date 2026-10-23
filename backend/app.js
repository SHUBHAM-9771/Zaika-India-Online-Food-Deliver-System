import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import AuthRouter from "./src/routes/userRouters.js";
import AddressRouter from "./src/routes/addressRoutes.js";
import stateRouter from "./src/routes/stateRouter.js";
import statefoodRouter from "./src/routes/statefoodRouter.js";
import foodItemRouter from "./src/routes/foodItemRouter.js";
import adminloginRouter from "./src/routes/adminloginRoute.js";
import adminregRouter from "./src/routes/adminregRoute.js";
import orderRoutes from "./src/routes/orderRoutes.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  }),
);

// ! MiddleWare
app.use(express.json());

app.use("/uploads", express.static("uplode"));

//  ! Database connection
connectDB();

// Routes
app.use(AuthRouter);
app.use(AddressRouter);
app.use(stateRouter);
app.use(statefoodRouter);
app.use(foodItemRouter);
app.use(adminloginRouter);
app.use(adminregRouter);
app.use(orderRoutes);
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server Started at PORT ${PORT}`);
});
