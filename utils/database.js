// utils/database.js
import mongoose from "mongoose";

let isConnected = false; // Global variable to track the connection status

export const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    throw error;
  }
};
