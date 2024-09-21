require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose
      .connect(MONGODB_URI)
      .then(() => console.log("MongoDB connected sucessfully!"));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
