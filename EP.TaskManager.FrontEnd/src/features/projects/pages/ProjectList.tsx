import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFolder, FiPlus } from 'react-icons/fi';

import PageHeader from '../../../common/components/PageHeader/PageHeader';
import Loader from '../../../common/components/Loader/Loader';
import EmptyState from '../../../common/components/EmptyState/EmptyState';
import ErrorAlert from '../../../common/components/ErrorAlert/ErrorAlert';
import ConfirmDialog from '../../../common/components/ConfirmDialog/ConfirmDialog';
import ProjectCard from '../components/ProjectCard';
import useProjects from '../hooks/useProjects';

export default function ProjectList() {
    const navigate = useNavigate();

    const {
        projects,
        loading,
        error,
        refreshProjects,
        removeProject,
    } = useProjects();

    const [deleteId, setDeleteId] = useState<number>();

    useEffect(() => {
        void refreshProjects();
    }, [refreshProjects]);


    const summary = useMemo(() => {
        return {
            total: projects.length,
        };
    }, [projects]);


    return (
        <div className="page-surface p-4 p-lg-5">

            <PageHeader
                title={
                    <span className="d-flex align-items-center gap-2">
                        <FiFolder />
                        Projects
                    </span>
                }
                buttonText={
                    <span className="d-flex align-items-center gap-2">
                        <FiPlus />
                        New Project
                    </span>
                }
                onButtonClick={() => navigate('/projects/save')}
            />


            <div className="row g-3 mb-4 justify-content-center">

                <div className="col-md-6">

                    <div className="card h-100 border-0 bg-primary-subtle">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div
                                className="
                                bg-primary
                                text-white
                                rounded-circle
                                d-flex
                                align-items-center
                                justify-content-center
                                "
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            >
                                <FiFolder size={24} />
                            </div>


                            <div>
                                <div className="text-muted small">
                                    Tracked Projects
                                </div>

                                <h3 className="mt-1 mb-0">
                                    {summary.total}
                                </h3>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <ErrorAlert message={error} />


            {loading ? (

                <Loader />

            ) : projects.length === 0 ? (

                <EmptyState
                    title="No projects yet"
                    message="Create your first project to start organizing work and tasks."
                    action={
                        <button
                            className="
                            btn btn-primary
                            mt-3
                            d-flex
                            align-items-center
                            gap-2
                            mx-auto
                            "
                            onClick={() => navigate('/projects/save')}
                        >
                            <FiPlus size={18} />
                            Create Project
                        </button>
                    }
                />

            ) : (

                <div className="row g-3 justify-content-center">

                    {projects.map((project) => (

                        <div
                            key={project.id}
                            className="col-lg-4 col-md-6"
                        >

                            <ProjectCard
                                project={project}
                                onEdit={() =>
                                    navigate(`/projects/save/${project.id}`)
                                }
                                onDelete={(id) => setDeleteId(id)}
                            />

                        </div>

                    ))}

                </div>

            )}


            <ConfirmDialog
                show={deleteId !== undefined}
                title="Delete Project"
                message="Are you sure you want to delete this project?"
                onClose={() => setDeleteId(undefined)}
                onConfirm={async () => {

                    if (deleteId === undefined) {
                        return;
                    }

                    await removeProject(deleteId);

                    await refreshProjects();

                    setDeleteId(undefined);
                }}
            />

        </div>
    );
}