import { prisma } from '../lib/prisma';

export const findUserByEmail = (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUser = (
    email: string,
    hashedPassword: string,
    name?: string,
) => {
    return prisma.user.create({
        data: { email, password: hashedPassword, name },
    });
};
