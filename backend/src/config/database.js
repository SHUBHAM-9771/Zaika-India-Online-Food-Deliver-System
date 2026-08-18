import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("DB connect Wrong", error);
  }
}
