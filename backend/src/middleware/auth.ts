import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const middlewareVerify = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'No token provided!' });
    }

    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
