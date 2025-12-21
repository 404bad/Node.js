import mongoose, { mongo } from "mongoose";

const connectDb = async (connectDbString) => {
  try {
    const conn = await mongoose.connect(connectDbString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDb;
