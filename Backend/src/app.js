import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();
app.use('/api/auth', authRoutes);

export default app;