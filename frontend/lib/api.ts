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
        credentials: 'include',
    });
    if (!request.ok) {
        throw new Error('Bad credentials');
    }
    const data = await request.json();
    return data;
};

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/api/tasks`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data;
};

export const updateTask = async (
    id: string,
    data: {
        status?: string;
        name?: string;
        priority?: string;
    },
) => {
    const updateReq = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!updateReq.ok) {
        throw new Error('Failed to update task');
    }
    return updateReq.json();
};

export const createTask = async (data: { name: string; priority: string }) => {
    const createReq = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!createReq.ok) {
        throw new Error('Failed to create task');
    }
    return createReq.json();
};

export const deleteTask = async (id: string) => {
    const deleteReq = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!deleteReq.ok) {
        throw new Error('Failed to delete task');
    }
    return deleteReq.json();
};
