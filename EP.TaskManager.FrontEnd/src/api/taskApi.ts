import axiosClient from './axiosClient';

import type { ApiResponse } from '../common/interfaces/ApiResponse';

import type { TaskItem } from '../features/tasks/types/TaskItem';
import type { SaveTaskRequest } from '../features/tasks/types/SaveTaskRequest';
import type { TaskStatus } from '../common/enums/TaskStatus';

export const getTaskById = async (id: number): Promise<ApiResponse<TaskItem>> => {
    const response = await axiosClient.get<ApiResponse<TaskItem>>(`/task/${id}`);

    return response.data;
};

export const getTasksByProject = async (projectId: number): Promise<ApiResponse<TaskItem[]>> => {
    const response = await axiosClient.get<ApiResponse<TaskItem[]>>(`/task/project/${projectId}`);

    return response.data;
};

export const getTasksByStatus = async (status: TaskStatus): Promise<ApiResponse<TaskItem[]>> => {
    const response = await axiosClient.get<ApiResponse<TaskItem[]>>(`/task/status/${status}`);

    return response.data;
};

export const createTask = async (model: SaveTaskRequest): Promise<ApiResponse<TaskItem>> => {
    const response = await axiosClient.post<ApiResponse<TaskItem>>('/task/save', model);

    return response.data;
};

export const updateTask = async (model: SaveTaskRequest): Promise<ApiResponse<boolean>> => {
    const response = await axiosClient.post<ApiResponse<boolean>>('/task/save', {
        ...model,
    });

    return response.data;
};

export const updateTaskStatus = async (
    id: number,
    status: TaskStatus,
): Promise<ApiResponse<boolean>> => {
    const response = await axiosClient.patch<ApiResponse<boolean>>(`/task/updatestatus/${id}`, {
        status,
    });

    return response.data;
};

export const deleteTask = async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await axiosClient.delete<ApiResponse<boolean>>(`/task/delete/${id}`);

    return response.data;
};
