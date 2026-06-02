import { Request, Response } from 'express';
import { registerUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (e: unknown) {
        res.status(400).json({ message: (e as Error).message });
    }
};
