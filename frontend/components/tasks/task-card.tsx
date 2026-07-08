import { Tasks } from '@/types';

type TaskCardProps = {
    task: Tasks;
};

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <div>
            <h4>{task.name}</h4>
            <p>{task.priority}</p>
            <p>{task.status}</p>
            {task.dueDate && <p>Due: {task.dueDate.toString()}</p>}
        </div>
    );
}
