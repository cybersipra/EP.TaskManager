import type { TaskStatus } from '../../../common/enums/TaskStatus';

export interface TaskItem {
    projectId: number;

    id: number;

    title: string;

    description: string;

    status: TaskStatus;

    dueDate: string;

    createdAt: string;

    updatedAt: string;
}
