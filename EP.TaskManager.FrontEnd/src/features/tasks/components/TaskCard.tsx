import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import type { TaskItem } from '../types/TaskItem';
import { TaskStatus } from '../../../common/enums/TaskStatus';

import Card from '../../../common/components/Card/Card';
import Button from '../../../common/components/Button/Button';

import TaskStatusBadge from './TaskStatusBadge';
import TaskStatusDropdown from './TaskStatusDropdown';

interface Props {
    task: TaskItem;
    onEdit: (task: TaskItem) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: TaskStatus) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: Props) {
    return (
        <Card className="h-100">
            <div className="d-flex justify-content-between align-items-start gap-2">
                <h5 className="mb-2 fw-semibold">{task.title}</h5>
                <TaskStatusBadge status={task.status} />
            </div>

            <p className="text-muted">{task.description}</p>

            <div className="mt-3 small text-muted">
                <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
            </div>

            <div className="mt-3">
                <label className="form-label">Change Status</label>

                <TaskStatusDropdown
                    value={task.status}
                    onChange={(status) => onStatusChange(task.id, status)}
                />
            </div>

            <div className="mt-3 d-flex flex-wrap gap-2">
                <Button
                    variant="warning"
                    onClick={() => onEdit(task)}
                    text={
                        <span className="d-flex align-items-center gap-2">
                            <FiEdit2 />
                            Edit
                        </span>
                    }
                />

                <Button
                    variant="danger"
                    onClick={() => onDelete(task.id)}
                    text={
                        <span className="d-flex align-items-center gap-2">
                            <FiTrash2 />
                            Delete
                        </span>
                    }
                />
            </div>
        </Card>
    );
}
