export enum Status {
    TODO,
    IN_PROGRESS,
    DONE,
}

export enum Priority {
    LOW,
    MEDIUM,
    HIGH,
    URGENT,
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
