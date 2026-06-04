import { Request, Response } from 'express';
import {
    createTaskService,
    deleteTaskService,
    getAllTasksService,
    updateTaskService,
} from '../services/task.service';

export const getAllUsersTasksController = async (
    req: Request,
    res: Response,
) => {
    const userId = (req as any).user.userId;
    try {
        const allUserTasks = await getAllTasksService(userId);
        res.status(200).json({
            message: 'Success All user Tasks Received',
            tasks: allUserTasks,
        });
    } catch (e) {
        console.log('No user found ' + e);
        res.status(400).json({ message: 'Bad data request' });
    }
};

export const newUserTaskController = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { name, priority, dueDate } = req.body;
    try {
        const createNewTask = await createTaskService(
            name,
            userId,
            priority,
            dueDate,
        );
        res.status(201).json({
            message: 'Success user created',
            createNewTask,
        });
    } catch (e: unknown) {
        res.status(409).json({
            message: 'User already exists',
        });
    }
};

export const updateTaskController = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { name, priority, dueDate } = req.body;
    try {
        const taskToUpdate = await updateTaskService(
            id,
            name,
            priority,
            dueDate,
        );
        res.status(200).json({
            message: 'Success task updated.',
            taskToUpdate,
        });
    } catch (e) {
        res.status(400).json({
            message: (e as Error).message,
        });
    }
};
export const deleteTaskController = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        const taskForDelete = await deleteTaskService(id);
        res.status(200).json({
            message: 'User task successfully deleted',
            taskForDelete,
        });
    } catch (e: unknown) {
        res.status(404).json({
            message: (e as Error).message,
        });
    }
};
