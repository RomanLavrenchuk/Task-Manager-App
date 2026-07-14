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
import { toast } from 'sonner';

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
            toast.success('Task created!');
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setOpen(false); // close modal
            reset(); // clear form
        },
        onError: () => {
            toast.error('Something went wrong');
        },
    });

    const onSubmit = (data: z.infer<typeof taskSchema>) => {
        mutation.mutate(data);
    };
    return (
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white'>
            <h1 className='text-lg font-medium text-gray-900'>My Tasks</h1>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='flex items-center gap-2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700'>
                        + New Task
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>

                    <div>
                        <div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='flex flex-col gap-3 mt-2'
                            >
                                {' '}
                                <div className='flex flex-col gap-1'>
                                    <label className='text-sm text-gray-600'>
                                        Task Name:
                                    </label>
                                    <input
                                        {...register('name')}
                                        className='border border-gray-200 rounded px-3 py-2 text-sm'
                                        placeholder='Enter task name'
                                    />
                                    {errors.name && (
                                        <p className='text-xs text-red-500'>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-sm text-gray-600'>
                                        Task Priority:
                                    </label>
                                    <select {...register('priority')}>
                                        <option value='LOW'>Low</option>
                                        <option value='MEDIUM'>Medium</option>
                                        <option value='HIGH'>High</option>
                                        <option value='URGENT'>Urgent</option>
                                    </select>
                                    {errors.priority && (
                                        <p className='text-xs text-red-500'>
                                            {errors.priority.message}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type='submit'
                                    className='bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 mt-2'
                                >
                                    Create task
                                </Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
