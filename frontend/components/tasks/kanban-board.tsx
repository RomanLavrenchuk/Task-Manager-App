'use client';

import { Status, Tasks } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/lib/api';
import { DndContext } from '@dnd-kit/core';
import KanbanColumn from './kanban-column';

export default function KanbanBoard() {
    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
    const tasks: Tasks[] = data?.tasks ?? []; // if no data then empty array

    if (isLoading) return <p>Loading...</p>;

    const todoTasks = tasks.filter((task) => task.status === Status.TODO);
    const inProgressTasks = tasks.filter(
        (task) => task.status === Status.IN_PROGRESS,
    );
    const doneTasks = tasks.filter((task) => task.status === Status.DONE);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
        console.log('Task:', active.id);
        console.log('New column:', over.id);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div>
                <div>
                    <h2>TODO</h2>
                    <KanbanColumn id={Status.TODO} tasks={todoTasks} />
                </div>
                <div>
                    <h2>IN PROGRESS</h2>
                    <KanbanColumn
                        id={Status.IN_PROGRESS}
                        tasks={inProgressTasks}
                    />
                </div>
                <div>
                    <h2>DONE</h2>
                    <KanbanColumn id={Status.DONE} tasks={doneTasks} />
                </div>
            </div>
        </DndContext>
    );
}
