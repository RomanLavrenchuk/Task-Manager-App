import TaskList from '@/components/tasks/task-list';
import { getTasksServer } from '@/lib/api.server';

export default async function Page() {
    const { tasks } = await getTasksServer();
    return <TaskList tasks={tasks} />;
}
