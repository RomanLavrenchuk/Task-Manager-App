import { Priority, Status } from '@prisma/client';
import {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
} from '../repositories/tasks.repository';

export const getAllTasksService = async (userId: string) => {
    if (!userId) {
        throw Error('404 User not found');
    }
    const allTasks = await getAllTasks(userId);
    return allTasks;
};

export const createTaskService = async (
    name: string,
    userId: string,
    priority: Priority,
    dueDate?: Date,
) => {
    if (!name) throw new Error('Task name is required');
    if (!userId) throw new Error('User not found');

    const newTask = await createTask(userId, name, priority, dueDate);
    return newTask;
};

export const updateTaskService = async (
    id: string,
    name?: string,
    status?: Status,
    priority?: Priority,
    dueDate?: Date,
) => {
    const updatedTaskData = await updateTask(
        id,
        name,
        status,
        priority,
        dueDate,
    );
    return updatedTaskData;
};

export const deleteTaskService = async (id: string) => {
    const removeTask = await deleteTask(id);
    return removeTask;
};
