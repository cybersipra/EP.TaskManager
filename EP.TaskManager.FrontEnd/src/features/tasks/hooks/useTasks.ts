import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    getTasksByProject,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
} from '../../../api/taskApi';

import { TaskStatus } from '../../../common/enums/TaskStatus';

import type { TaskItem } from '../types/TaskItem';
import type { SaveTaskRequest } from '../types/SaveTaskRequest';

function normalizeTasks(payload: unknown): TaskItem[] {
    if (Array.isArray(payload)) {
        return payload as TaskItem[];
    }

    if (payload && typeof payload === 'object' && 'data' in payload) {
        const nested = (payload as { data?: unknown }).data;
        return normalizeTasks(nested);
    }

    return [];
}

export default function useTasks(projectId: number) {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const refreshTasks = useCallback(async () => {
        if (!projectId) return;

        try {
            setLoading(true);
            setError(undefined);

            const response = await getTasksByProject(projectId);
            if (response.success) {
                const payload = response?.data ?? response;
                setTasks(normalizeTasks(payload));
            } else {
                toast.error(response.message);
            }

        } catch {
            setError('Unable to load tasks.');
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void refreshTasks();
        }, 0);

        return () => window.clearTimeout(timer);
    }, [refreshTasks]);

    const addTask = async (model: SaveTaskRequest) => {
        try {
            const response =await createTask(model);
            if (response.success) {
                toast.success(response.message);
                await refreshTasks();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Unable to create task.');
        }
    };

    const editTask = async (model: SaveTaskRequest) => {
        try {
            const response = await updateTask(model);
            if (response.success) {
                toast.success(response.message);
                await refreshTasks();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Unable to update task.');
        }
    };

    const removeTask = async (id: number) => {
        try {
            const response = await deleteTask(id);
            if (response.success) {
                toast.success(response.message);
                await refreshTasks();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Unable to delete task.');
        }
    };

    const changeStatus = async (id: number, status: TaskStatus) => {
        try {
            const response = await updateTaskStatus(id, status);
            if (response.success) {
                toast.success(response.message);
                await refreshTasks();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error('Unable to update task status.');
        }
    };

    return {
        tasks,
        loading,
        error,
        refreshTasks,
        addTask,
        editTask,
        removeTask,
        changeStatus,
    };
}
