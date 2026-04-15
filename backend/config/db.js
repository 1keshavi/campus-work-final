const mongoose = require("mongoose");

async function connectDB(mongoUri) {
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    if (error?.code === "ECONNREFUSED" && error?.syscall === "querySrv") {
      console.error(
        "MongoDB SRV lookup failed. Switch to the standard mongodb:// Atlas URI if your environment blocks SRV DNS queries."
      );
    } else {
      console.error("MongoDB connection failed:", error.message);
    }

    throw error;
  }
}

module.exports = connectDB;
