import mongoose from 'mongoose';

const connectDB = async () => {
    // 1. Kiểm tra nếu đã có kết nối trước đó (Tối ưu cho Warm Start của Lambda)
    if (mongoose.connection.readyState >= 1) {
        console.log("=> Re-using existing database connection");
        return;
    }

    try {
        console.log("=> Creating new database connection");
        console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

        // 2. Tắt cảnh báo DeprecationWarning strictQuery
        mongoose.set('strictQuery', false);

        // 3. Kết nối thẳng (Mongoose mới tự xử lý các option cũ)
        await mongoose.connect(process.env.MONGO_URI as string);
        
        console.log("Database is connected");
    } catch (error: any) {
        console.log("Connect database has failed");
        console.log(error.message);
        throw error; // Nên throw lỗi để middleware phía ngoài (Express) biết để trả về status 500
    }
}

export default connectDB;