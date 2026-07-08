'use client';

import { Status, Tasks } from '@/types';
import TaskList from './task-list';

type TasksProp = {
    tasks: Tasks[];
};

export default function KanbanBoard({ tasks }: TasksProp) {
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
