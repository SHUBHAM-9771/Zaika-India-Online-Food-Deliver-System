// import mongoose, { connect } from "mongoose";

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGOOSE_URL);
//     console.log("connection successfully");
//   } catch (error) {
//     console.log("Connection is faild");
//   }
// }

// export default connectDB;

import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log(
      "Mongo URL loaded:",
      process.env.MONGOOSE_URL?.startsWith("mongodb"),
    );
  }
}

export default connectDB;
