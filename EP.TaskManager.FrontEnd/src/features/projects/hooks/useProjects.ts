import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { getProjects, createProject, updateProject, deleteProject } from '../../../api/projectApi';

import type { Project } from '../types/Project';
import type { SaveProjectRequest } from '../types/SaveProjectRequest';

function normalizeProjects(payload: unknown): Project[] {
    if (Array.isArray(payload)) {
        return payload as Project[];
    }

    if (payload && typeof payload === 'object' && 'data' in payload) {
        const nested = (payload as { data?: unknown }).data;
        return normalizeProjects(nested);
    }

    return [];
}

export default function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const refreshProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(undefined);

            const response = await getProjects();
            if (response.success) {
                const payload = response?.data ?? response;
                setProjects(normalizeProjects(payload));
            } else {
                toast.error(response.message);
            }
        } catch {
            setError('Unable to load projects.');
        } finally {
            setLoading(false);
        }
    }, []);


    const addProject = async (model: SaveProjectRequest) => {
        try {
            const response = await createProject(model);
            if (response.success) {
                toast.success(response.message);
                await refreshProjects();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Failed to create project');
        }
    };

    const editProject = async (model: SaveProjectRequest) => {
        try {
            const response = await updateProject(model);
            if (response.success) {
                toast.success(response.message);
                await refreshProjects();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Failed to update project');
        }
    };

    const removeProject = async (id: number) => {
        try {
            const response = await deleteProject(id);
            if (response.success) {
                toast.success(response.message);
                await refreshProjects();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Failed to delete project');
        }
    };

    return {
        projects,
        loading,
        error,
        refreshProjects,
        addProject,
        editProject,
        removeProject,
    };
}
