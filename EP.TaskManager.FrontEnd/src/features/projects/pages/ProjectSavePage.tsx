import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiEdit2, FiPlusSquare } from 'react-icons/fi';

import { getProjectById } from '../../../api/projectApi';
import PageHeader from '../../../common/components/PageHeader/PageHeader';
import Loader from '../../../common/components/Loader/Loader';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';
import type { Project } from '../types/Project';
import type { SaveProjectRequest } from '../types/SaveProjectRequest';

export default function ProjectSavePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addProject, editProject } = useProjects();

    const [project, setProject] = useState<Project>();
    const [loading, setLoading] = useState(Boolean(id));
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!id) return;

        const loadProject = async () => {
            try {
                setLoading(true);

                const response = await getProjectById(Number(id));

                if (response.success) {
                    setProject(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch {
                toast.error('Unable to load project.');
            } finally {
                setLoading(false);
            }
        };

        void loadProject();
    }, [id]);

    const handleSubmit = async (model: SaveProjectRequest) => {
        const normalizedModel = {
            ...model,
            id: model.id,
            name: model.name.trim(),
            description: model.description.trim(),
        };

        try {
            setSubmitting(true);

            if (project?.id) {
                await editProject(normalizedModel);
            } else {
                await addProject(normalizedModel);
            }

            navigate('/projects');
        } catch {
            toast.error('Unable to save project.');
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
                        {project ? <FiEdit2 /> : <FiPlusSquare />}
                        {project ? 'Edit Project' : 'Create Project'}
                    </span>
                }
                buttonText={
                    <span className="d-flex align-items-center gap-2">
                        <FiArrowLeft />
                        Back to Projects
                    </span>
                }
                onButtonClick={() => navigate('/projects')}
            />

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <ProjectForm
                        project={project}
                        onSubmit={handleSubmit}
                        isSubmitting={submitting}
                    />
                </div>
            </div>
        </div>
    );
}
