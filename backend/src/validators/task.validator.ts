import { z } from 'zod';

export const taskSchema = z.object({
    name: z.string().min(2).max(15),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    dueDate: z.string().datetime().optional(),
});
