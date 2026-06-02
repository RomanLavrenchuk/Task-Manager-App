import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../repositories/auth.repository';
import jwt from 'jsonwebtoken';

export const registerUser = async (email: string, password: string) => {
    const existing = await findUserByEmail(email);
    if (existing) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d',
        },
    );
    return {
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
};
