import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import AuthRouter from "./src/routes/authRouters.js";
import AddressRouter from "./src/routes/addressRoutes.js";
import stateRouter from "./src/routes/stateRouter.js";
import statefoodRouter from "./src/routes/statefoodRouter.js";
import foodItemRouter from "./src/routes/foodItemRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    origin: "http://localhost:5173",
  }),
);

// ! MiddleWare
app.use(express.json());

//  ! Database connection
connectDB();

// Routes
app.use(AuthRouter);
app.use(AddressRouter);
app.use(stateRouter, express.static("upload"));
app.use(statefoodRouter, express.static("upload"));
app.use(foodItemRouter, express.static("upload"));

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server Started at PORT ${PORT}`);
});
