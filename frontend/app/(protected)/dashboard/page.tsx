import { getTasksServer } from '@/lib/api.server';

export default function page() {
    return getTasksServer();
}
