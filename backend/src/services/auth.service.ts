import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../repositories/auth.repository';

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
