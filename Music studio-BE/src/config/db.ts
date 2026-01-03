import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Read .env config
const MONGODB_URI = process.env.MONGODB_URI;
const SKIP_DB = (process.env.SKIP_DB || '').toLowerCase() === 'true' || process.env.SKIP_DB === '1';

const connectDB = async () => {
  // Allow skipping DB entirely for quick local dev or CI where DB isn't available
  if (SKIP_DB) {
    console.warn('SKIP_DB is set — skipping MongoDB connection (use a real DB in production)');
    return;
  }

  if (!MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined. Set MONGODB_URI or set SKIP_DB=true to skip DB during development.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected successfully! 💾');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;