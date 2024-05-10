import mongoose from "mongoose";
const database = process.env.MONGO
const connectDB = async () => {
  try {
    await mongoose.connect(database);
  } catch (error) {
    throw new Error("could not connect");
  }
};
export default connectDB;
