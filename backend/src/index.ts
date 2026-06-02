import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from 'express';

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
app.get('/tasks', (req: Request, res: Response) => {
    res.json([]);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
