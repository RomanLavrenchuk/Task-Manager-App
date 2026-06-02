import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export const signUp = async (email: string, password: string) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            throw new Error('User already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return user;
    } catch (e: unknown) {
        throw new Error('Something went wrong ' + (e as Error).message);
    }
};
