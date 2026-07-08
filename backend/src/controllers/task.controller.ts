import { Request, Response } from 'express';
import {
    createTaskService,
    deleteTaskService,
    getAllTasksService,
    updateTaskService,
} from '../services/task.service';
import { taskSchema, updateTaskSchema } from '../validators/task.validator';

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
    try {
        const taskDataValidation = taskSchema.safeParse(req.body);
        if (!taskDataValidation.success) {
            return res
                .status(400)
                .json({ message: taskDataValidation.error.issues });
        }
        const { name, priority, dueDate } = taskDataValidation.data;
        const dueDateConverted = dueDate ? new Date(dueDate) : undefined; // zod return string, i converted into Date
        const createNewTask = await createTaskService(
            name,
            userId,
            priority,
            dueDateConverted,
        );
        res.status(201).json({
            message: 'Success task created',
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
    try {
        const updatedValidData = updateTaskSchema.safeParse(req.body);
        if (!updatedValidData.success) {
            return res
                .status(400)
                .json({ message: updatedValidData.error.issues });
        }
        const { name, status, priority, dueDate } = updatedValidData.data;
        const dueDateConverted = dueDate ? new Date(dueDate) : undefined; // zod return string, i converted into Date
        const taskToUpdate = await updateTaskService(
            id,
            name,
            status,
            priority,
            dueDateConverted,
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
