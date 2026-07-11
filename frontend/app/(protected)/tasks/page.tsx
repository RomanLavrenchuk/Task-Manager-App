import KanbanBoard from '@/components/tasks/kanban-board';
import TasksHeader from '@/components/tasks/tasks-header';

export default function Page() {
    return (
        <>
            <KanbanBoard />
            <TasksHeader />
        </>
    );
}
