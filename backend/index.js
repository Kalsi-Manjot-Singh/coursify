import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/userRoutes.js';
import courseRouter  from './routes/courseRoutes.js';
import adminRouter  from './routes/adminRoutes.js';
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();