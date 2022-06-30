import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MongoURI||"");
    console.log(`MongoDB conneted: ${(await conn).connection.host}`);
  } catch (e: any) {
    console.log(`Error: ${e.message}`);
    process.exit();
  }
};
// module.exports = connectDB;
export default connectDB;