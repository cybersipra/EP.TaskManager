import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    FiClipboard,
    FiFileText,
    FiPlus,
} from 'react-icons/fi';

import PageHeader from '../../../common/components/PageHeader/PageHeader';
import Loader from '../../../common/components/Loader/Loader';
import ErrorAlert from '../../../common/components/ErrorAlert/ErrorAlert';
import ConfirmDialog from '../../../common/components/ConfirmDialog/ConfirmDialog';
import EmptyState from '../../../common/components/EmptyState/EmptyState';

import TaskCard from '../../tasks/components/TaskCard';
import useTasks from '../../tasks/hooks/useTasks';

import { getProjectById } from '../../../api/projectApi';

import type { Project } from '../types/Project';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const projectId = Number(id);

    const {
        tasks,
        loading,
        error,
        removeTask,
        changeStatus,
    } = useTasks(projectId);

    const [project, setProject] = useState<Project>();
    const [deleteId, setDeleteId] = useState<number>();

    useEffect(() => {
        async function loadProject() {
            try {
                const response = await getProjectById(projectId);

                if (response.success) {
                    setProject(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch {
                toast.error('Unable to load project.');
            }
        }

        void loadProject();
    }, [projectId]);

    if (!project) {
        return <Loader />;
    }

    return (
        <div className="page-surface p-4 p-lg-5">

            <PageHeader
                title={
                    <span className="d-flex align-items-center gap-2">
                        <FiClipboard />
                        {project.name}
                    </span>
                }
                buttonText={
                    <span className="d-flex align-items-center gap-2">
                        <FiPlus />
                        New Task
                    </span>
                }
                onButtonClick={() =>
                    navigate(`/projects/${projectId}/tasks/save`)
                }
            />

            <ErrorAlert message={error} />

            {/* Project Information */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">

                    <h5 className="fw-semibold d-flex align-items-center gap-2 mb-3">
                        <FiFileText />
                        Project Description
                    </h5>

                    <p className="text-muted mb-4">
                        {project.description}
                    </p>

                    <div className="row">

                        <div className="col-md-6">
                            <small className="text-muted">
                                Created
                            </small>

                            <div className="fw-semibold">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <small className="text-muted">
                                Updated
                            </small>

                            <div className="fw-semibold">
                                {new Date(project.updatedAt).toLocaleDateString()}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {loading ? (
                <Loader />
            ) : tasks.length === 0 ? (
                <EmptyState
                    title="No tasks yet"
                    message="Add the first task for this project to track progress and deadlines."
                    action={
                        <button
                            className="btn btn-primary d-flex align-items-center gap-2 mx-auto"
                            onClick={() =>
                                navigate(`/projects/${projectId}/tasks/save`)
                            }
                        >
                            <FiPlus />
                            Add Task
                        </button>
                    }
                />
            ) : (
                <div className="row g-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="col-lg-4 col-md-6"
                        >
                            <TaskCard
                                task={task}
                                onEdit={(selectedTask) =>
                                    navigate(
                                        `/projects/${projectId}/tasks/save/${selectedTask.id}`,
                                    )
                                }
                                onDelete={(taskId) =>
                                    setDeleteId(taskId)
                                }
                                onStatusChange={changeStatus}
                            />
                        </div>
                    ))}
                </div>
            )}

            <ConfirmDialog
                show={deleteId !== undefined}
                title="Delete Task"
                message="Are you sure you want to delete this task?"
                onClose={() => setDeleteId(undefined)}
                onConfirm={async () => {
                    if (deleteId !== undefined) {
                        await removeTask(deleteId);
                    }

                    setDeleteId(undefined);
                }}
            />

        </div>
    );
}