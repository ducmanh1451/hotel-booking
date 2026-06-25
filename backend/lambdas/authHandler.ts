import express from 'express';
import serverless from 'serverless-http';
// import mongoose from 'mongoose';
import cors from 'cors';
import { register, login } from '../controllers/authController';
// import { connectDB } from '../config/db.ts'
import connectDB from '../config/db';

const app = express();

// Kích hoạt các middleware cơ bản
app.use(cors());
app.use(express.json());

// Hàm kết nối DB tối ưu: Tái sử dụng lại kết nối cũ nếu Lambda còn ấm (Warm Start)
// const connectDB = async () => {
//     if (mongoose.connection.readyState >= 1) {
//         console.log("=> Re-using existing database connection");
//         return;
//     }
//     console.log("=> Creating new database connection");
//     await mongoose.connect(process.env.MONGO_URI || '');
// };

// Middleware đảm bảo kết nối DB thông suốt trước khi vào controller chính
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error: any) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

// Định tuyến trực tiếp cho cụm Auth chức năng đơn giản để test trước
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Bộ xử lý lỗi tập trung (Error Handler Middleware)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Export authHandler cho AWS Lambda
export const authHandler = serverless(app);