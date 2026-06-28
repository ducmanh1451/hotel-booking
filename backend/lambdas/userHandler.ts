import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import connectDB from '../config/db';
import userRoutes from '../routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error: any) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

app.use('/api/users', userRoutes);

// Global Error Handler Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

export const userHandler = serverless(app);