import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

import { connectDB } from "./src/config/database.js";

const app = express();

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log("error");
  }
  console.log(`server start at PORT ${PORT}`);
});
