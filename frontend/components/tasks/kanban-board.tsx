'use client';

import { Status, Tasks } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTasks, updateTask } from '@/lib/api';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import KanbanColumn from './kanban-column';

export default function KanbanBoard() {
    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
    const tasks: Tasks[] = data?.tasks ?? []; // if no data then empty array

    //Mutation
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: Status }) =>
            updateTask(id, { status }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                // update cash
                queryKey: ['tasks'],
            });
        },
    });

    if (isLoading) return <p>Loading...</p>;

    const todoTasks = tasks.filter((task) => task.status === Status.TODO);
    const inProgressTasks = tasks.filter(
        (task) => task.status === Status.IN_PROGRESS,
    );
    const doneTasks = tasks.filter((task) => task.status === Status.DONE);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id.toString();
        const newStatus = over.id as Status;

        mutation.mutate({
            id: taskId,
            status: newStatus,
        });
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-3 gap-4 p-6'>
                <div className='flex flex-col'>
                    <h2 className='text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2'>
                        <span className='w-2 h-2 rounded-full bg-gray-400 inline-block'></span>
                        TODO
                    </h2>
                    <KanbanColumn id={Status.TODO} tasks={todoTasks} />
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wider flex items-center gap-2'>
                        <span className='w-2 h-2 rounded-full bg-blue-500 inline-block'></span>
                        IN PROGRESS
                    </h2>
                    <KanbanColumn
                        id={Status.IN_PROGRESS}
                        tasks={inProgressTasks}
                    />
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-xs font-semibold text-green-600 mb-3 uppercase tracking-wider flex items-center gap-2'>
                        <span className='w-2 h-2 rounded-full bg-green-500 inline-block'></span>
                        DONE
                    </h2>
                    <KanbanColumn id={Status.DONE} tasks={doneTasks} />
                </div>
            </div>
        </DndContext>
    );
}
