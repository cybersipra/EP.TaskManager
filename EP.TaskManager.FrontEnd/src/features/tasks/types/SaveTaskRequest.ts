import type { TaskStatus } from '../../../common/enums/TaskStatus';

export interface SaveTaskRequest {
    projectId: number;

    id?: number;

    title: string;

    description: string;

    status: TaskStatus;

    dueDate: string;
}
