import mongoose, { ConnectOptions } from "mongoose";
import { ServerApiVersion } from "mongodb";

const clientOptions: ConnectOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const connectToDB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url, clientOptions);
    console.log("Connected to MongoDB");

    mongoose.connection.on("error", (err: Error) => {
      console.error("Mongoose connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("Mongoose connection disconnected");
    });
  } catch (error: any) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectToDB;
