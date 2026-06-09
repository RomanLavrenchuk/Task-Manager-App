import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const middlewareVerify = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided!' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = payload; //to the request i added user payload, for further usage userId
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
