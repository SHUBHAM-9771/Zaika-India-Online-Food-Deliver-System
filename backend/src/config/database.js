import mongoose, { connect } from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("connection successfully");
  } catch (error) {
    console.log("Connection is faild");
  }
}

export default connectDB;
