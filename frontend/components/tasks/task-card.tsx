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
import { deleteTask, updateTask } from '@/lib/api';
import { z } from 'zod';
import { priorityColors } from '@/lib/constants';
import { toast } from 'sonner';

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

    //edit mutation
    const mutation = useMutation({
        mutationFn: (data: {
            name: string;
            priority: string;
            status?: string;
        }) => updateTask(task.id, data),
        onError: () => {
            toast.error('Failed to update task');
        },
        onSuccess: () => {
            toast.success('Task updated!');
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setOpen(false); // close modal
            reset(); // clear form
        },
    });

    //delete mutation
    const deleteMutation = useMutation({
        mutationFn: () => deleteTask(task.id),
        onError: () => {
            toast.error('Failed to delete task');
        },
        onSuccess: () => {
            toast.success('Task deleted!');
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const onSubmit = (data: z.infer<typeof taskSchema>) => {
        mutation.mutate(data);
    };

    return (
        <>
            <div
                ref={setNodeRef}
                {...attributes}
                className='bg-white rounded-lg border border-gray-200 p-3 mb-2 shadow-sm'
            >
                <div {...listeners} className='cursor-grab mb-3'>
                    <h4 className='text-sm font-medium text-gray-900'>
                        {task.name}{' '}
                    </h4>
                    {task.dueDate && (
                        <p className='text-xs text-gray-400 mt-1'>
                            Due: {task.dueDate.toString()}
                        </p>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
                    >
                        {task.priority}
                    </span>
                    <div className='flex gap-1'>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className='text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 text-gray-600'
                                >
                                    Edit
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    Edit task: {task.name}
                                </DialogHeader>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className='flex flex-col gap-3 mt-2'
                                >
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-sm text-gray-600'>
                                            Task name
                                        </label>
                                        <input
                                            {...register('name')}
                                            defaultValue={task.name}
                                            className='border border-gray-200 rounded px-3 py-2 text-sm'
                                        />
                                        {errors.name && (
                                            <p className='text-xs text-red-500'>
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-sm text-gray-600'>
                                            Priority
                                        </label>
                                        <select
                                            {...register('priority')}
                                            defaultValue={task.priority}
                                            className='border border-gray-200 rounded px-3 py-2 text-sm'
                                        >
                                            <option value='LOW'>Low</option>
                                            <option value='MEDIUM'>
                                                Medium
                                            </option>
                                            <option value='HIGH'>High</option>
                                            <option value='URGENT'>
                                                Urgent
                                            </option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-sm text-gray-600'>
                                            Status
                                        </label>
                                        <select
                                            {...register('status')}
                                            defaultValue={task.status}
                                            className='border border-gray-200 rounded px-3 py-2 text-sm'
                                        >
                                            <option value='TODO'>To do</option>
                                            <option value='IN_PROGRESS'>
                                                In progress
                                            </option>
                                            <option value='DONE'>Done</option>
                                        </select>
                                    </div>
                                    <Button type='submit' className='mt-2'>
                                        Update task
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <button
                            onClick={() => deleteMutation.mutate()}
                            className='text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
