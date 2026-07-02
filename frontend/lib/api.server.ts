import 'server-only';
import { cookies } from 'next/headers';
import { API_URL } from './api';

export const getTasksServer = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const response = await fetch(`${API_URL}/api/tasks`, {
        headers: {
            Cookie: `token=${token?.value}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};
