import { Tasks } from '@/types';
import TaskCard from '../tasks/task-card';

type TasksProp = {
    tasks: Tasks[];
};

export default function TaskList({ tasks }: TasksProp) {
    return (
        <div>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
