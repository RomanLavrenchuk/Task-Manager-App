export const Status = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export const Priority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    URGENT: 'URGENT',
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

export type User = {
    id: string;
    name?: string | null;
    email: string;
};
export type Tasks = {
    id: string;
    userId: string;
    name: string;
    status: Status;
    priority: Priority;
    dueDate?: string;
};
