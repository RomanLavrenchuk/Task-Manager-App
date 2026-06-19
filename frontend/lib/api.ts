export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const registerUser = async (
    email: string,
    password: string,
    name?: string,
) => {
    const request = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    });
    if (!request.ok) {
        throw new Error('Invalid email or password');
    }
    return request.json();
};

export const loginUser = async (email: string, password: string) => {
    const request = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!request.ok) {
        throw new Error('Bad credentials');
    }
    const data = await request.json();
    return data;
};
