import KanbanBoard from '@/components/tasks/kanban-board';
import { getTasksServer } from '@/lib/api.server';

export default async function Page() {
    const { tasks } = await getTasksServer();
    return <KanbanBoard tasks={tasks} />;
}
