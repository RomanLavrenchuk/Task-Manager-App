import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.routes';
import { taskRouter } from './routes/tasks.routes';

dotenv.config();
const app = express();
app.use(
    cors({
        origin: '*',
        credentials: false,
    }),
);
app.use(express.json());

const port = process.env.PORT || 8888;

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
