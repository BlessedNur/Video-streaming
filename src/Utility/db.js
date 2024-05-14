import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO;
    
    if (!mongoURI) {
      throw new Error("MONGO environment variable is not set");
    }

    console.log("Attempting to connect to MongoDB with URI:", mongoURI); // Log the connection string
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    throw new Error("Could not connect to MongoDB");
  }
};

export default connectDB;
