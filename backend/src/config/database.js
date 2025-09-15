const mongoose = require('mongoose');

// MongoDB connection via Mongoose
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-mini';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Connected Successfully');
    return { type: 'mongodb', connection: conn.connection };
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB
};