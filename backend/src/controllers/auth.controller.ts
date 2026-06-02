import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser(email, password);
        res.status(201).json({
            message: 'User registered successfully.',
            user,
        });
    } catch (e: unknown) {
        res.status(400).json({ message: (e as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        res.status(200).json({
            message: 'User loggedIn successfully.',
            user,
        });
    } catch (e: unknown) {
        res.status(401).json({ message: (e as Error).message });
    }
};
