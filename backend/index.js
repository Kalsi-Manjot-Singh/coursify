import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/userRoutes.js';
import courseRouter  from './routes/courseRoutes.js';
import adminRouter  from './routes/adminRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});