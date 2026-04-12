import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.ts';
import authRoutes from './api/routes/auth.route.ts';
import { errorMiddleware } from './api/middlewares/errorMiddleware.ts';
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();
app.use('/api/auth', authRoutes);

app.use(errorMiddleware)

export default app;