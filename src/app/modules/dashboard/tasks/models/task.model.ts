export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    completed: boolean;
}

export interface TaskRequest {
    title: string;
    description: string;
    completed: boolean;
}
