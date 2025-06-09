import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/', reviewRoutes);

// Routes
app.get('/', (req, res) => res.send('Book Review API Running'));

// ✅ Export app so Vercel can use it
export default app;

// ✅ Only run the server locally (Vercel handles it in its own way)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error('MongoDB connection error:', err));
}
