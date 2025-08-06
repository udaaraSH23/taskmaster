// config/db.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task-manager';
    await mongoose.connect(MONGO_URI);
    console.log('[DB] Connected to MongoDB');
  } catch (error) {
    console.error('[DB] Connection error:', error);
    process.exit(1);
  }
};
