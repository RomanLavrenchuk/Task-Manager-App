import { Tasks, Status, Priority } from '@/types';

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const registerUser = async (
    email: string,
    password: string,
    name?: string,
): Promise<{ message: string }> => {
    const request = await fetch(`/api/auth/register`, {
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

export const loginUser = async (
    email: string,
    password: string,
): Promise<{
    message: string;
    user: {
        message: string;
        user: {
            id: string;
            email: string;
            name: string | null;
        };
    };
}> => {
    const request = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    if (!request.ok) {
        throw new Error('Bad credentials');
    }
    return request.json();
};

export const getTasks = async (): Promise<{ tasks: Tasks[] }> => {
    const response = await fetch(`/api/tasks`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

export const updateTask = async (
    id: string,
    data: {
        status?: Status;
        name?: string;
        priority?: Priority;
    },
): Promise<{ message: string; taskToUpdate: Tasks }> => {
    const updateReq = await fetch(`/api/tasks/${id}`, {
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

export const createTask = async (data: {
    name: string;
    priority: Priority;
}): Promise<{ message: string; createNewTask: Tasks }> => {
    const createReq = await fetch(`/api/tasks`, {
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

export const deleteTask = async (
    id: string,
): Promise<{ message: string; taskForDelete: Tasks }> => {
    const deleteReq = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!deleteReq.ok) {
        throw new Error('Failed to delete task');
    }
    return deleteReq.json();
};
