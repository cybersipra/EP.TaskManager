export const TaskStatus = {
    ToDo: 0,
    InProgress: 1,
    Done: 2,
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
