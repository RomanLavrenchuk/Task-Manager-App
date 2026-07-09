'use client';
import { Tasks } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './task-card';

type TasksProp = {
    tasks: Tasks[];
    id: string;
};

export default function KanbanColumn({ id, tasks }: TasksProp) {
    const { setNodeRef } = useDroppable({
        id: id,
    });
    return (
        <div ref={setNodeRef} style={{ minHeight: '500px', width: '100%' }}>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
