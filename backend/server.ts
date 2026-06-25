import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { uploadsDir } from './utils/uploadsPath';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

// Routes
import roomRoutes from './routes/roomRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app: Application = express();

dotenv.config();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/uploads", express.static(uploadsDir));

// Default 
app.get("/api", (req: Request, res: Response)  => {
    res.status(201).json({ message: "Welcome to Hotel Booking App" });
})

// Room Route
app.use("/api/rooms", roomRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Booking Route
app.use("/api/bookings", bookingRoutes);

// Upload Route
app.use("/api/uploads", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.status(201).send(process.env.PAYPAL_CLIENT_ID);
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`));
