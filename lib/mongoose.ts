import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
  if (isConnected) return console.log("=> Already connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("=> Connected to MongoDB");
  } catch (error) {
    console.log("=> Error connecting to MongoDB:");
  }
};
