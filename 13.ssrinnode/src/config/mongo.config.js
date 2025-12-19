import mongoose from "mongoose";

const connectDb = async (connectionString) => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDb;
