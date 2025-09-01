const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Subbu:Subbu2702@cluster0.bbkihai.mongodb.net/DevTinder?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // stop app if DB connection fails
  }
};

module.exports = connectDB;
