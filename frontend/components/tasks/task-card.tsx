'use client';
import { useState } from 'react';
import { Tasks } from '@/types';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '../ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/lib/validators';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/lib/api';
import { z } from 'zod';

type TaskCardProps = {
    task: Tasks;
};

export default function TaskCard({ task }: TaskCardProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false); // useState to manage the open state of the dialog
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: task.id,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: {
            name: string;
            priority: string;
            status?: string;
        }) => updateTask(task.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setOpen(false); // close modal
            reset(); // clear form
        },
    });

    const onSubmit = (data: z.infer<typeof taskSchema>) => {
        mutation.mutate(data);
    };

    return (
        <>
            <div ref={setNodeRef} {...attributes}>
                <div {...listeners} style={{ cursor: 'grab' }}>
                    <h4>{task.name}</h4>
                    <p>{task.priority}</p>
                    {task.dueDate && <p>Due: {task.dueDate.toString()}</p>}
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={(e) => e.stopPropagation()}>
                            Edit Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Edit Task: {task.name}</DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor='name'>Task Name:</label>
                                <input
                                    {...register('name')}
                                    defaultValue={task.name}
                                />
                            </div>
                            <div>
                                <label htmlFor='priority'>Priority:</label>
                                <select
                                    {...register('priority')}
                                    defaultValue={task.priority}
                                >
                                    <option value='LOW'>LOW</option>
                                    <option value='MEDIUM'>MEDIUM</option>
                                    <option value='HIGH'>HIGH</option>
                                    <option value='URGENT'>URGENT</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='status'>Status:</label>
                                <select
                                    {...register('status')}
                                    defaultValue={task.status}
                                >
                                    <option value='TODO'>TODO</option>
                                    <option value='IN_PROGRESS'>
                                        IN_PROGRESS
                                    </option>
                                    <option value='DONE'>DONE</option>
                                </select>
                            </div>
                            {errors.name && <p>{errors.name.message}</p>}
                            {errors.priority && (
                                <p>{errors.priority.message}</p>
                            )}
                            {errors.status && <p>{errors.status.message}</p>}
                            {task.dueDate && (
                                <p>Due: {task.dueDate.toString()}</p>
                            )}
                            <Button type='submit'>Update Task</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
