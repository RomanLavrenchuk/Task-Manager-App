'use client';
import { Tasks } from '@/types';
import { useDraggable } from '@dnd-kit/core';

type TaskCardProps = {
    task: Tasks;
};

export default function TaskCard({ task }: TaskCardProps) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: task.id,
    });
    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            <h4>{task.name}</h4>
            <p>{task.priority}</p>
            {task.dueDate && <p>Due: {task.dueDate.toString()}</p>}
        </div>
    );
}
