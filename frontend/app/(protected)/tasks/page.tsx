import KanbanBoard from '@/components/tasks/kanban-board';
import TasksHeader from '@/components/tasks/tasks-header';

export default function Page() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <TasksHeader />
            <KanbanBoard />
        </div>
    );
}
