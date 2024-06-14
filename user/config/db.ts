import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!, {
    //   serverSelectionTimeoutMS: 30000,
    });
    console.log("Database connected");
  } catch (error) {
    throw new Error("Database connection error: " + error);
  }
};
