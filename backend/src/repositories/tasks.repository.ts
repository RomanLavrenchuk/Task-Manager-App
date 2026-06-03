import { Priority } from '@prisma/client';
import { prisma } from '../lib/prisma';

export const getAllTasks = async (userId: string) => {
    const userTasks = await prisma.task.findMany({
        where: { userId },
    });
    return userTasks;
};

export const createTask = async (
    userId: string,
    name: string,
    priority: Priority,
    dueDate?: Date,
) => {
    const newUserTask = await prisma.task.create({
        data: {
            name,
            userId,
            priority,
            dueDate,
        },
    });
    return newUserTask;
};

export const updateTask = async (
    id: string,
    name?: string,
    priority?: Priority,
    dueDate?: Date,
) => {
    const newData = await prisma.task.update({
        where: { id },
        data: {
            name,
            priority,
            dueDate,
        },
    });
    return newData;
};

export const deleteTask = async (id: string) => {
    const removeTask = await prisma.task.delete({
        where: { id },
    });
    return removeTask;
};
