export enum Status {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT',
}

export type User = {
    id: string;
    name?: string;
    email: string;
};
export type Tasks = {
    id: string;
    userId: string;
    name: string;
    status: Status;
    priority: Priority;
    dueDate?: Date;
};
