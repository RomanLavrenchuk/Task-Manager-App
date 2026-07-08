'use client';

import { Status, Tasks } from '@/types';
import TaskList from './task-list';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/lib/api';

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

    return (
        <div>
            <div>
                <h2>TODO</h2>
                <TaskList tasks={todoTasks} />
            </div>
            <div>
                <h2>IN PROGRESS</h2>
                <TaskList tasks={inProgressTasks} />
            </div>
            <div>
                <h2>DONE</h2>
                <TaskList tasks={doneTasks} />
            </div>
        </div>
    );
}
