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

        console.log('active.id:', active.id); // ← id таску
        console.log('over.id:', over.id);
        const taskId = active.id.toString();
        const newStatus = over.id as Status;
        console.log('mutating with:', { taskId, newStatus }); // ← додай це

        mutation.mutate({
            id: taskId,
            status: newStatus,
        });
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div
                    style={{
                        width: '300px',
                        minHeight: '500px',
                        background: 'lightblue',
                    }}
                >
                    <h2>TODO</h2>
                    <KanbanColumn id={Status.TODO} tasks={todoTasks} />
                </div>
                <div
                    style={{
                        width: '300px',
                        minHeight: '500px',
                        background: 'lightgreen',
                    }}
                >
                    <h2>IN PROGRESS</h2>
                    <KanbanColumn
                        id={Status.IN_PROGRESS}
                        tasks={inProgressTasks}
                    />
                </div>
                <div
                    style={{
                        width: '300px',
                        minHeight: '500px',
                        background: 'lightyellow',
                    }}
                >
                    <h2>DONE</h2>
                    <KanbanColumn id={Status.DONE} tasks={doneTasks} />
                </div>
            </div>
        </DndContext>
    );
}
