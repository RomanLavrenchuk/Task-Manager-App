import { Router } from 'express';
import { middlewareVerify } from '../middleware/auth';
import {
    getAllUsersTasksController,
    newUserTaskController,
    updateTaskController,
    deleteTaskController,
} from '../controllers/task.controller';

export const taskRouter = Router();

taskRouter.get('/', middlewareVerify, getAllUsersTasksController);
taskRouter.post('/', middlewareVerify, newUserTaskController);
taskRouter.put('/:id', middlewareVerify, updateTaskController);
taskRouter.delete('/:id', middlewareVerify, deleteTaskController);
