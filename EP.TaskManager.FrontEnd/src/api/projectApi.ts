import axiosClient from './axiosClient';

import type { ApiResponse } from '../common/interfaces/ApiResponse';
import type { Project } from '../features/projects/types/Project';
import type { SaveProjectRequest } from '../features/projects/types/SaveProjectRequest';

export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
    const response = await axiosClient.get<ApiResponse<Project[]>>('/project/list');
    return response.data;
};

export const getProjectById = async (id: number): Promise<ApiResponse<Project>> => {
    const response = await axiosClient.get<ApiResponse<Project>>(`/project/${id}`);
    return response.data;
};

export const createProject = async (model: SaveProjectRequest): Promise<ApiResponse<Project>> => {
    const response = await axiosClient.post<ApiResponse<Project>>('/project/save', model);

    return response.data;
};

export const updateProject = async (model: SaveProjectRequest): Promise<ApiResponse<boolean>> => {
    const response = await axiosClient.post<ApiResponse<boolean>>('/project/save', {
        ...model,
    });

    return response.data;
};

export const deleteProject = async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await axiosClient.delete<ApiResponse<boolean>>(`/project/delete/${id}`);

    return response.data;
};
