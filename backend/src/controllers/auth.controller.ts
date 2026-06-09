import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { loginSchema, registerSchema } from '../validators/auth.validator';

export const register = async (req: Request, res: Response) => {
    try {
        const validated = registerSchema.safeParse(req.body);
        if (!validated.success) {
            return res.status(400).json({ message: validated.error.issues });
        }
        const { email, password } = validated.data;
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
        const validatedLoginData = loginSchema.safeParse(req.body);
        if (!validatedLoginData.success) {
            return res
                .status(400)
                .json({ message: validatedLoginData.error.issues });
        }
        const { email, password } = validatedLoginData.data;
        const user = await loginUser(email, password);
        const { token, ...userWithoutToken } = user;
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: 'User loggedIn successfully.',
            user: userWithoutToken,
        });
    } catch (e: unknown) {
        res.status(401).json({ message: (e as Error).message });
    }
};
