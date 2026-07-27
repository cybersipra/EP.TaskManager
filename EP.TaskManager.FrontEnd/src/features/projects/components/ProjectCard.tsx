
import type { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';

import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

import Card from '../../../common/components/Card/Card';
import Button from '../../../common/components/Button/Button';

interface Props {
    project: Project;

    onEdit: (project: Project) => void;

    onDelete: (id: number) => void;
}

export default function ProjectCard({
    project,
    onEdit,
    onDelete,
}: Props) {
    const navigate = useNavigate();

    return (
        <Card className="h-100">

            <div className="d-flex flex-column h-100">

                <div className="d-flex justify-content-between align-items-start gap-2">

                    <h5 className="mb-2 fw-semibold">
                        {project.name}
                    </h5>

                    <span className="badge bg-primary-subtle text-primary">
                        Active
                    </span>

                </div>


                <p className="text-muted flex-grow-1">
                    {project.description}
                </p>


                <div className="small text-muted mt-3">

                    <div>
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                    </div>

                    <div>
                        Updated: {new Date(project.updatedAt).toLocaleDateString()}
                    </div>

                </div>


                <div className="mt-3 d-flex flex-wrap gap-2">


                    <Button
                        text={
                            <span className="d-flex align-items-center gap-1">
                                <FiEdit size={16} />
                                Edit
                            </span>
                        }
                        variant="warning"
                        onClick={() => onEdit(project)}
                    />


                    <Button
                        text={
                            <span className="d-flex align-items-center gap-1">
                                <FiTrash2 size={16} />
                                Delete
                            </span>
                        }
                        variant="danger"
                        onClick={() => onDelete(project.id)}
                    />


                    <Button
                        text={
                            <span className="d-flex align-items-center gap-1">
                                <FiEye size={16} />
                                View
                            </span>
                        }
                        variant="primary"
                        onClick={() => navigate(`/projects/${project.id}`)}
                    />

                </div>

            </div>

        </Card>
    );
}