import mongoose from 'mongoose';
import app from '../server.js';
import dotenv from 'dotenv';

dotenv.config();

// Ensure DB is connected (if not already)
let isConnected = false;

if (!isConnected) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      isConnected = true;
      console.log('Connected to MongoDB on Vercel');
    })
    .catch((err) => console.error('MongoDB connection error on Vercel:', err));
}

// ✅ Vercel uses this exported app
export default app;
