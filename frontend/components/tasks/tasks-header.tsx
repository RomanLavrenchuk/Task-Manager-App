'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/lib/validators';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/lib/api';
import { useState } from 'react';

export default function TasksHeader() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: { name: string; priority: string }) =>
            createTask(data),
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>New Task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>

                    <div>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {' '}
                                <div>
                                    <label htmlFor='name'>Task Name:</label>
                                    <input {...register('name')} />
                                    {errors.name && (
                                        <p>{errors.name.message}</p>
                                    )}
                                </div>
                                <div></div>
                                <div>
                                    <label htmlFor='priority'>
                                        Task Priority:
                                    </label>
                                    <select {...register('priority')}>
                                        <option value='LOW'>Low</option>
                                        <option value='MEDIUM'>Medium</option>
                                        <option value='HIGH'>High</option>
                                        <option value='URGENT'>Urgent</option>
                                    </select>
                                    {errors.priority && (
                                        <p>{errors.priority.message}</p>
                                    )}
                                </div>
                                <Button type='submit'>Submit</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
