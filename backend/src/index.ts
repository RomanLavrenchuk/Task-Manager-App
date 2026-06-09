import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes';
import { taskRouter } from './routes/tasks.routes';

dotenv.config();
const app = express();
app.use(cookieParser()); //it allows Express read cookies
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(express.json());

const port = process.env.PORT || 8888;

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
