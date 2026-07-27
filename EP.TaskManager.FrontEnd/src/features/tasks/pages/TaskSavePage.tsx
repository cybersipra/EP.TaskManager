import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiEdit2, FiPlusSquare } from 'react-icons/fi';
import { FiFolder } from 'react-icons/fi';
import { getProjectById } from '../../../api/projectApi';
import { getTaskById } from '../../../api/taskApi';
import Loader from '../../../common/components/Loader/Loader';
import PageHeader from '../../../common/components/PageHeader/PageHeader';
import TaskForm from '../components/TaskForm';
import useTasks from '../hooks/useTasks';
import type { TaskItem } from '../types/TaskItem';
import type { SaveTaskRequest } from '../types/SaveTaskRequest';
import type { Project } from '../../projects/types/Project';

export default function TaskSavePage() {
    const { id, projectId } = useParams();
    const navigate = useNavigate();
    const numericProjectId = Number(projectId);
    const { addTask, editTask } = useTasks(numericProjectId);
    const [task, setTask] = useState<TaskItem>();
    const [project, setProject] = useState<Project>();
    const [loading, setLoading] = useState(Boolean(id));
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const [projectResponse, taskResponse] = await Promise.all([
                    getProjectById(numericProjectId),
                    id ? getTaskById(Number(id)) : Promise.resolve(undefined),
                ]);
                if (projectResponse.success) {
                    setProject(projectResponse.data);
                } else {
                    toast.error(projectResponse.message);
                }
                if (taskResponse?.success) {
                    setTask(taskResponse?.data ?? undefined);
                } else {
                    toast.error(taskResponse?.message);
                }
            } catch {
                toast.error('Unable to load task details.');
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, [id, numericProjectId]);

    const handleSubmit = async (model: SaveTaskRequest) => {
        try {
            setSubmitting(true);
            const payload = { ...model, projectId: numericProjectId };

            if (task?.id) {
                await editTask(payload);
            } else {
                await addTask(payload);
            }

            navigate(`/projects/${numericProjectId}`);
        } catch {
            toast.error('Unable to save task.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="page-surface p-4 p-lg-5">
            <PageHeader
                title={
                    <span className="d-flex align-items-center gap-2">
                        {task ? <FiEdit2 /> : <FiPlusSquare />}
                        {task ? 'Edit Task' : 'Create Task'}
                    </span>
                }
                buttonText={
                    <span className="d-flex align-items-center gap-2">
                        <FiArrowLeft />
                        Back to Project
                    </span>
                }
                onButtonClick={() => navigate(`/projects/${numericProjectId}`)}
            />

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card p-3 p-lg-4">
                        <div className="mb-3">
                            <h5 className="mb-1 d-flex align-items-center gap-2">
                                <FiFolder />
                                {project?.name ?? 'Project'}
                            </h5>

                            <p className="text-muted mb-0">
                                Manage task details for this project.
                            </p>
                        </div>
                        <TaskForm
                            task={task}
                            projectId={numericProjectId}
                            onSubmit={handleSubmit}
                            isSubmitting={submitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
